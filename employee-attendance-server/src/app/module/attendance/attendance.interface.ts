import { Types } from 'mongoose';

export type TBreak = {
  startBreak: Date;
  endBreak?: Date;
};
export type TDailyWorkSessions = {
  checkInTime: Date;
  checkOutTime?: Date;
};

export type TAttendance = {
  employeeId: Types.ObjectId;
  checkInDate: Date;
  dailyWorkSessions: TDailyWorkSessions[];
  isAbsent: boolean;
  breaks: TBreak[];
  leaveType: 'Sick' | 'Casual' | 'Earned' | 'Other';
};
