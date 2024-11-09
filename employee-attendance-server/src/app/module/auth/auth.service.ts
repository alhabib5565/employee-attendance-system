import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TEmployee } from '../employee/employee.interface';
import { Employee } from '../employee/employee.model';
import { generateEmployeeId } from '../employee/employee.utils';
import { TLoginEmployee } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { createToken, verifyToken } from './auth.utils';

const registerEmployee = async (payload: TEmployee) => {
  payload.employeeId = await generateEmployeeId();
  payload.role = 'Employee';

  const result = await Employee.create(payload);

  return result;
};

const loginEmployee = async (payload: TLoginEmployee) => {
  const employee = await Employee.findOne({ email: payload.email }).select(
    '+password',
  );
  if (!employee) {
    throw new AppError(httpStatus.NOT_FOUND, 'Employee not found');
  }

  if (employee.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This employee is deleted !');
  }

  if (employee.status === 'Blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This employee is blocked ! !');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    employee?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password does not match!');
  }

  const jwtPayload = {
    email: employee.email,
    role: employee.role,
    employee_id: employee._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const employee = await Employee.findOne({
    email: decoded.email,
    role: decoded.role,
  });

  if (!employee) {
    throw new AppError(httpStatus.NOT_FOUND, 'Employee not found');
  }

  if (employee.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This employee is deleted !');
  }

  if (employee.status === 'Blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This employee is blocked ! !');
  }

  const jwtPayload = {
    email: employee.email,
    role: employee.role,
    employee_id: employee._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  registerEmployee,
  loginEmployee,
  refreshToken,
};