import { Types } from 'mongoose';
import { Notification } from './notification.model';
import httpStatus from 'http-status';
import AppError from '../../error/AppError';

const markNotificationAsRead = async (
  notificationId: string,
  userId: Types.ObjectId,
) => {
  // Find the notification by ID
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    throw new AppError(httpStatus.NOT_FOUND, 'Notification not found!');
  }

  // Check if the user is a recipient of this notification
  if (!notification.recipientIds.includes(userId)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to read this notification.',
    );
  }

  // Check if the user has already read the notification
  if (notification.readBy.includes(userId)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Notification already marked as read.',
    );
  }

  // Update the readBy field
  const result = await Notification.findOneAndUpdate(
    { _id: notificationId },
    {
      $addToSet: { readBy: userId },
    },
    {
      new: true,
    },
  );

  return result;
};

export const NotificationService = {
  markNotificationAsRead,
};
