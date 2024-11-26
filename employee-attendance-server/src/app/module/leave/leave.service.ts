import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { TLeave } from './leave.interface';
import { Leave } from './leave.model';
import dayjs from 'dayjs';
import { Employee } from '../employee/employee.model';
import { startSession, Types } from 'mongoose';
import { USER_ROLE } from '../employee/employee.constant';
import { Notification } from '../notification/notification.model';
import { TNotification } from '../notification/notification.interface';

const requestForLeave = async (payload: TLeave) => {
  const leaveStart = dayjs(payload.startDate);
  const leaveEnd = dayjs(payload.endDate);

  const employee = await Employee.findOne({ _id: payload.employeeId });
  if (!employee) {
    throw new AppError(httpStatus.NOT_FOUND, 'Employee not found!');
  }

  const admins = await Employee.find({ role: USER_ROLE.Admin }, { _id: 1 });
  const adminIds = admins.map((admin) => admin._id);

  const remainingLeave = employee?.leave_quota - employee?.leave_taken;
  const leaveDuration = leaveEnd.diff(leaveStart, 'days');

  if (leaveDuration <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Leave duration must be at least 1 day.',
    );
  }

  if (remainingLeave < leaveDuration) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You only have ${remainingLeave} leave days remaining, but your request is for ${leaveDuration} days. Please adjust your leave request accordingly.`,
    );
  }

  const session = await startSession();

  try {
    session.startTransaction();
    //create leave
    payload.leaveDuration = leaveDuration;
    const result = await Leave.create([payload], { session });

    const notificationData: TNotification = {
      recipientIds: adminIds,
      createdBy: employee._id,
      readBy: [],
      message: `New leave request submitted by Employee Name: ${employee.name}`,
      title: 'Leave Request Submitted',
      path: 'test',
    };

    // create notification
    await Notification.create([notificationData], { session });
    await session.commitTransaction();
    await session.endSession();

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction(); // for rollback the operations
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error.message ||
        'Something went wrong while processing your leave request.',
    );
  } finally {
    await session.endSession();
  }
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
  delete payload.status;
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

  const result = await Leave.findOneAndUpdate({ _id }, payload, {
    new: true,
  });

  return result;
};

const leaveStatusUpdate = async (
  _id: string,
  createdById: Types.ObjectId,
  payload: { status: 'Pending' | 'Approved' | 'Rejected' },
) => {
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

  const validStatuses = ['Pending', 'Approved', 'Rejected'];
  if (!validStatuses.includes(payload.status)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid status value');
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

    const notificationData: TNotification = {
      recipientIds: [leave.employeeId],
      createdBy: createdById,
      readBy: [],
      message: `Your leave request has been updated to ${payload.status}`,
      title: 'Leave Status Update',
      path: 'test',
    };

    // create notification
    await Notification.create([notificationData], { session });

    const result = await Leave.findOneAndUpdate(
      { _id },
      { status: payload.status },
      {
        new: true,
        session,
      },
    );
    await session.commitTransaction();
    await session.endSession();

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction(); // for rollback the operations
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error.message || 'Something is wrong',
    );
  }
};

export const LeaveService = {
  requestForLeave,
  updateLeave,
  getAllLeave,
  getSingleLeave,
  leaveStatusUpdate,
};
