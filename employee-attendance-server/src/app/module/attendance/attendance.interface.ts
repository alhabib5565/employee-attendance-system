import { Types } from 'mongoose';

export type TAttendance = {
  employeeId: Types.ObjectId;
  checkInTime: string;
  checkInDate: Date;
  checkOutTime: string;
  isAbsent: boolean;
  leaveType: 'Sick' | 'Casual' | 'Earned' | 'Other';
};
