import { model, Schema } from 'mongoose';
import { TNotification } from './notification.interface';

const notificationSchema = new Schema<TNotification>(
  {
    recipientIds: {
      type: [Schema.Types.ObjectId],
      ref: 'Employee',
      required: true,
    },
    readBy: {
      type: [Schema.Types.ObjectId],
      ref: 'Employee',
      required: true,
      default: [],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Notification = model('Notification', notificationSchema);
