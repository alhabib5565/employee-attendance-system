import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { TLeave } from './leave.interface';
import { Leave } from './leave.model';

const requestForLeave = async (payload: TLeave) => {
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
