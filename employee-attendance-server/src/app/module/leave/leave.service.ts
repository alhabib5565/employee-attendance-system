import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { TLeave } from './leave.interface';
import { Leave } from './leave.model';
import dayjs from 'dayjs';
import { Employee } from '../employee/employee.model';
import { startSession } from 'mongoose';

const requestForLeave = async (payload: TLeave) => {
  const leaveStart = dayjs(payload.startDate);
  const leaveEnd = dayjs(payload.endDate);

  const employee = await Employee.findOne({ _id: payload.employeeId });
  if (!employee) {
    throw new AppError(httpStatus.NOT_FOUND, 'Employee not found!');
  }
  const remainingLeave = employee?.leave_quota - employee?.leave_taken;
  const leaveDuration = leaveEnd.diff(leaveStart, 'days');
  if (remainingLeave < leaveDuration) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You only have ${remainingLeave} leave days remaining, but your request is for ${leaveDuration} days. Please adjust your leave request accordingly.`,
    );
  }

  payload.leaveDuration = leaveDuration;
  const result = await Leave.create(payload);
  return result;
};

const getAllLeave = async (query: Record<string, unknown>) => {
  const searchAbleFields = ['name', 'email'];
  const employeeQuery = new QueryBuilder(
    query,
    Leave.find().populate('employeeId'),
  )
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await employeeQuery.countTotal();
  const result = await employeeQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleLeave = async (_id: string) => {
  const result = await Leave.findOne({ _id });
  return result;
};

const updateLeave = async (_id: string, payload: Partial<TLeave>) => {
  const leave = await Leave.findOne({ _id });
  if (!leave) {
    throw new AppError(httpStatus.NOT_FOUND, 'Leave request not found!!');
  }

  if (leave.status === 'Approved') {
    throw new AppError(
      httpStatus.BAD_GATEWAY,
      'Your leave request already approved',
    );
  }

  const session = await startSession();

  try {
    session.startTransaction();
    if (payload.status === 'Approved') {
      await Employee.findOneAndUpdate(
        { _id: leave.employeeId },
        { $inc: { leave_taken: leave.leaveDuration } },
        { session },
      );
    }

    await session.commitTransaction();
    await session.endSession();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction(); // for rollback the operations
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error.message || 'Something is wrong',
    );
  }

  const result = await Leave.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

export const LeaveService = {
  requestForLeave,
  updateLeave,
  getAllLeave,
  getSingleLeave,
};
