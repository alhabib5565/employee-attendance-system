import { Types } from 'mongoose';

export type TLeave = {
  employeeId: Types.ObjectId;
  description: string;
  leaveType: 'Sick' | 'Casual' | 'Earned' | 'Other';
  startDate: Date;
  endDate: Date;
  status: 'Pending' | 'Approved' | 'Rejected';
  leaveDuration: number;
};
