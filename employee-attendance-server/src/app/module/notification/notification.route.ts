import express from 'express';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../employee/employee.constant';
import { NotificationController } from './notification.controller';

const router = express.Router();

router.patch(
  '/:id/mark-notification-as-read',
  auth(USER_ROLE.Admin, USER_ROLE.Employee),
  NotificationController.markNotificationAsRead,
);

export const notificationRouter = router;
