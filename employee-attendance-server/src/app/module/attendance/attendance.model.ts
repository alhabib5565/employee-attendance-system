import mongoose, { model, Schema } from 'mongoose';
import { TAttendance } from './attendance.interface';

const attendanceSchema = new Schema<TAttendance>(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    },
    checkInDate: {
      type: Date,
    },
    checkInTime: {
      type: String,
    },
    checkOutTime: {
      type: String,
    },
    isAbsent: {
      type: Boolean,
      default: false,
    },
    leaveType: {
      type: String,
      enum: ['Sick', 'Casual', 'Earned', 'Other'],
    },
  },
  {
    timestamps: true,
  },
);

export const Attendance = model('Attendance', attendanceSchema);
