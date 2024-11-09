import { model, Schema } from 'mongoose';
import { TLeave } from './leave.interface';

const leaveSchema = new Schema<TLeave>({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
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
});

export const Leave = model('Leave', leaveSchema);
