import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { EmployeeService } from './employee.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createEmployee = catchAsync(async (req: Request, res: Response) => {
  const result = await EmployeeService.createEmployee(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Employees created successfully.',
    data: result,
  });
});

const getAllEmployee = catchAsync(async (req: Request, res: Response) => {
  const { result, meta } = await EmployeeService.getAllEmployee(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Employees retrieved successfully.',
    meta,
    data: result,
  });
});

const getSingleEmployee = catchAsync(async (req: Request, res: Response) => {
  const result = await EmployeeService.getSingleEmployee(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `Employee with ID ${req.params.id} updated successfully.`,
    data: result,
  });
});

const updateEmployee = catchAsync(async (req: Request, res: Response) => {
  const result = await EmployeeService.updateEmployee(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: '',
    data: result,
  });
});

export const EmployeeController = {
  createEmployee,
  getAllEmployee,
  getSingleEmployee,
  updateEmployee,
};
