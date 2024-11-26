import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { LeaveService } from './leave.service';

const requestForLeave = catchAsync(async (req: Request, res: Response) => {
  const result = await LeaveService.requestForLeave(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Leave request send successfully.',
    data: result,
  });
});

const getAllLeave = catchAsync(async (req: Request, res: Response) => {
  const { result, meta } = await LeaveService.getAllLeave(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'All leave retrieved successfully.',
    meta,
    data: result,
  });
});

const getSingleLeave = catchAsync(async (req: Request, res: Response) => {
  const result = await LeaveService.getSingleLeave(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `Leave with ID ${req.params.id} get successfully.`,
    data: result,
  });
});

const updateLeave = catchAsync(async (req: Request, res: Response) => {
  const result = await LeaveService.updateLeave(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `Leave with ID ${req.params.id} update successfully.`,
    data: result,
  });
});

const leaveStatusUpdate = catchAsync(async (req: Request, res: Response) => {
  const result = await LeaveService.leaveStatusUpdate(
    req.params.id,
    req.employee.employee_id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `Leave status update successfully.`,
    data: result,
  });
});

export const LeaveController = {
  requestForLeave,
  getAllLeave,
  getSingleLeave,
  updateLeave,
  leaveStatusUpdate,
};
