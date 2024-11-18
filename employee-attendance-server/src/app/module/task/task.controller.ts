import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { TaskService } from './task.service';

const createTask = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.createTask(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Task create successfully.',
    data: result,
  });
});

const getAllTask = catchAsync(async (req: Request, res: Response) => {
  const { result, meta } = await TaskService.getAllTask(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'All task retrieved successfully.',
    meta,
    data: result,
  });
});

const getSingleTask = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.getSingleTask(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `Task with ID ${req.params.id} retrieved successfully.`,
    data: result,
  });
});

const updateTask = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.updateTask(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `Task with ID ${req.params.id} update successfully.`,
    data: result,
  });
});

const addWorkSessions = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.addWorkSessions(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `Task with ID ${req.params.id} add work session suuccessflly.`,
    data: result,
  });
});

const endWorkSessions = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskService.endWorkSessions(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `Task with ID ${req.params.id} end work session suuccessflly.`,
    data: result,
  });
});

export const TaskController = {
  createTask,
  getAllTask,
  getSingleTask,
  updateTask,
  addWorkSessions,
  endWorkSessions,
};
