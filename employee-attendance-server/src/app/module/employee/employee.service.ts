import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { TEmployee } from './employee.interface';
import { Employee } from './employee.model';
import { generateEmployeeId } from './employee.utils';
import { sendFileToCloudinary } from '../../utils/sendFileToCloudinary';

const createEmployee = async (payload: TEmployee) => {
  payload.employeeId = await generateEmployeeId();
  const result = await Employee.create(payload);
  return result;
};

const getAllEmployee = async (query: Record<string, unknown>) => {
  const searchAbleFields = ['name', 'email'];
  const employeeQuery = new QueryBuilder(query, Employee.find())
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

const getSingleEmployee = async (_id: string) => {
  const result = await Employee.findOne({ _id });
  return result;
};

const updateEmployee = async (_id: string, payload: Partial<TEmployee>) => {
  const employee = await Employee.findOne({ _id });
  if (!employee) {
    throw new AppError(httpStatus.NOT_FOUND, 'Employee not found!!');
  }

  const result = await Employee.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadProfilePhoto = async (_id: string, file: any) => {
  const employee = await Employee.findOne({ _id });
  if (!employee) {
    throw new AppError(httpStatus.NOT_FOUND, 'Employee not found!!');
  }

  if (!file) {
    throw new AppError(httpStatus.NOT_FOUND, 'Profile image not found');
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadedFileInfo: any = await sendFileToCloudinary({
    fileName: file.originalname,
    fileBuffer: file.buffer,
    resource_type: 'image',
  });
  const profileImage = uploadedFileInfo?.secure_url;

  const result = await Employee.findOneAndUpdate(
    { _id },
    { profileImage },
    {
      new: true,
    },
  );
  return result;
};

export const EmployeeService = {
  createEmployee,
  getAllEmployee,
  getSingleEmployee,
  updateEmployee,
  uploadProfilePhoto,
};
