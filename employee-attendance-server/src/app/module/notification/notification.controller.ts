import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { NotificationService } from './notification.service';

const markNotificationAsRead = catchAsync(
  async (req: Request, res: Response) => {
    const result = await NotificationService.markNotificationAsRead(
      req.params.id,
      req.employee.employee_id,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Notification marked as read successfully.',
      data: result,
    });
  },
);

export const NotificationController = {
  markNotificationAsRead,
};
