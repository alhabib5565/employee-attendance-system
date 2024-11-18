import mongoose, { model, Schema } from 'mongoose';
import {
  TAttendance,
  TBreak,
  TDailyWorkSessions,
} from './attendance.interface';

const breakSchema = new Schema<TBreak>({
  startBreak: {
    type: Date,
  },
  endBreak: {
    type: Date,
  },
});

const dailyWorkSessionsSchema = new Schema<TDailyWorkSessions>({
  checkInTime: {
    type: Date,
  },
  checkOutTime: {
    type: Date,
  },
});

const attendanceSchema = new Schema<TAttendance>(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    },
    checkInDate: {
      type: Date,
      required: true,
    },

    isAbsent: {
      type: Boolean,
      default: false,
    },
    dailyWorkSessions: {
      type: [dailyWorkSessionsSchema],
      default: [],
    },
    breaks: {
      type: [breakSchema],
      default: [],
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
