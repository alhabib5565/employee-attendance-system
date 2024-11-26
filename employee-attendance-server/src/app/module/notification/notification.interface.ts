import { Types } from 'mongoose';

export type TNotification = {
  recipientIds: Types.ObjectId[];
  readBy: Types.ObjectId[];
  message: string;
  title: string;
  path: string;
  createdBy: Types.ObjectId;
};
