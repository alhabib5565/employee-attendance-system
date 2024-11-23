import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AuthService } from './auth.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

const registerEmployee = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerEmployee(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Registration successfully done',
    data: result,
  });
});

const loginEmployee = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = await AuthService.loginEmployee(
    req.body,
  );
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Employee Loggin successful',
    data: { accessToken, refreshToken },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await AuthService.changePassword(req.employee, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfull!',
    data: result,
  });
});

export const AuthController = {
  registerEmployee,
  loginEmployee,
  refreshToken,
  changePassword,
};
