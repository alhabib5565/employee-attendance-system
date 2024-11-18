import { model, Schema } from 'mongoose';
import { TTask, TTaskSession } from './task.interface';
import { TASK_STATUS } from './task.constant';

const TaskSessionSchema = new Schema<TTaskSession>(
  {
    startTime: { type: Date },
    endTime: { type: Date },
  },
  {
    _id: false,
  },
);

const TaskSchema = new Schema<TTask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    status: {
      type: String,
      enum: Object.values(TASK_STATUS),
      default: TASK_STATUS.Open,
    },
    workSessions: { type: [TaskSessionSchema], default: [] },
  },
  {
    timestamps: true,
  },
);

export const Task = model('Task', TaskSchema);
