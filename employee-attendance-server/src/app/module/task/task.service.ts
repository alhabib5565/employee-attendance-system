import httpStatus, { BAD_REQUEST } from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { TTask } from './task.interface';
import { Task } from './task.model';

const createTask = async (payload: TTask) => {
  const result = await Task.create(payload);
  return result;
};

const getAllTask = async (query: Record<string, unknown>) => {
  const searchAbleFields = ['name', 'email'];
  const taskQuery = new QueryBuilder(query, Task.find().populate('createdBy'))
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await taskQuery.countTotal();
  const result = await taskQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleTask = async (_id: string) => {
  const result = await Task.findOne({ _id });
  return result;
};

const updateTask = async (_id: string, payload: Partial<TTask>) => {
  const task = await Task.findOne({ _id });
  if (!task) {
    throw new AppError(httpStatus.NOT_FOUND, 'Task not found!!');
  }

  const result = await Task.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

const addWorkSessions = async (_id: string, payload: { startTime: string }) => {
  const task = await Task.findOne({ _id });
  if (!task) {
    throw new AppError(httpStatus.NOT_FOUND, 'Task not found!!');
  }

  const openSession = task.workSessions.find((session) => !session?.endTime);
  if (openSession) {
    throw new AppError(BAD_REQUEST, 'Alrealy have a work session');
  }
  const result = await Task.findOneAndUpdate(
    { _id },
    {
      $addToSet: {
        workSessions: payload,
      },
    },
    {
      new: true,
    },
  );
  return result;
};

const endWorkSessions = async (_id: string, payload: { endTime: string }) => {
  const task = await Task.findOne({ _id });
  if (!task) {
    throw new AppError(httpStatus.NOT_FOUND, 'Task not found!!');
  }

  const workSessions = task.workSessions.map((session) => {
    if (!session?.endTime) {
      return {
        startTime: session.startTime,
        endTime: payload.endTime,
      };
    } else {
      return session;
    }
  });

  const result = await Task.findOneAndUpdate(
    { _id },
    { workSessions: workSessions },
    {
      new: true,
    },
  );
  return result;
};

export const TaskService = {
  createTask,
  updateTask,
  getAllTask,
  getSingleTask,
  endWorkSessions,
  addWorkSessions,
};
