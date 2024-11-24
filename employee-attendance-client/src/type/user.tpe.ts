import { USER_ROLE } from "@/constant/common";

export type TEmployee = {
  name: string;
  employeeId: string;
  designation: string;
  email: string;
  role: TUserRole;
  phone?: string;
  profileImage?: string;
  status: string;
  isDeleted: boolean;
  _id: string;
  updatedAt: string;
  createdAt: string;
  leave_quota: number;
  leave_taken: number;
};

export type TUserRole = keyof typeof USER_ROLE;
