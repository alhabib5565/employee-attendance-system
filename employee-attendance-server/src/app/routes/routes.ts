import express from 'express';
import { employee_router } from '../module/employee/employee.route';
import { authRouter } from '../module/auth/auth.route';
import { attendanceRouter } from '../module/attendance/attendance.route';
import { leaveRouter } from '../module/leave/leave.route';
import { taskRouter } from '../module/task/task.route';
import { notificationRouter } from '../module/notification/notification.route';

const router = express.Router();

const appRoutes = [
  {
    path: '/employees',
    routes: employee_router,
  },
  {
    path: '/auth',
    routes: authRouter,
  },
  {
    path: '/attendances',
    routes: attendanceRouter,
  },
  {
    path: '/leaves',
    routes: leaveRouter,
  },
  {
    path: '/tasks',
    routes: taskRouter,
  },
  {
    path: '/notifications',
    routes: notificationRouter,
  },
];

appRoutes.map((routes) => router.use(routes.path, routes.routes));

export const routes = router;
