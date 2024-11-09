import { USER_ROLE, USER_STATUS } from './employee.constant';

export type TEmployee = {
  employeeId: string;
  name: string;
  email: string;
  role: TEmployeeRole;
  password: string;
  designation: string;
  status: TEmployeeStatus;
  isDeleted: boolean;
  profileImage?: string;
  phone?: number;
};

export type TEmployeeStatus = keyof typeof USER_STATUS;

export type TEmployeeRole = keyof typeof USER_ROLE;
