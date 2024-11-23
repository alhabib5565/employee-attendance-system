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
};

export type TUserRole = keyof typeof USER_ROLE;
