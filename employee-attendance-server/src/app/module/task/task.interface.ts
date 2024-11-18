import { Types } from 'mongoose';
import { TASK_STATUS } from './task.constant';

type TTaskStatus = keyof typeof TASK_STATUS;

export type TTaskSession = {
  startTime: Date;
  endTime: Date;
};
export type TTask = {
  title: string;
  description: string;
  createdBy: Types.ObjectId;
  status: TTaskStatus;
  workSessions: TTaskSession[];
};
