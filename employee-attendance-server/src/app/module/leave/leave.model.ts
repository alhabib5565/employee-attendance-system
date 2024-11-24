import { model, Schema } from 'mongoose';
import { TLeave } from './leave.interface';

const leaveSchema = new Schema<TLeave>({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  description: {
    type: String,
  },
  leaveType: {
    type: String,
    enum: ['Sick', 'Casual', 'Earned', 'Other'],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  leaveDuration: {
    type: Number,
    default: 0,
  },
});

export const Leave = model('Leave', leaveSchema);
