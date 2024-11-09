import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../error/AppError';
import httpStatus from 'http-status';
import { verifyToken } from '../module/auth/auth.utils';
import config from '../config';
import { Employee } from '../module/employee/employee.model';
import { TEmployeeRole } from '../module/employee/employee.interface';

export const auth = (...requiredRoles: TEmployeeRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = verifyToken(token, config.jwt_access_secret as string);
    const employee = await Employee.findOne({
      email: decoded.email,
      role: decoded.role,
    });
    if (!employee) {
      throw new AppError(httpStatus.NOT_FOUND, 'Employee not found!');
    }

    if (employee.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This employee is deleted !');
    }

    if (employee.status === 'Blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This employee is blocked ! !');
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized  hi!',
      );
    }
    req.employee = decoded;
    next();
  });
};
