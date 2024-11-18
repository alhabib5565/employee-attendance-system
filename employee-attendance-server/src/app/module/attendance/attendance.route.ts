import express from 'express';
import { AttendanceController } from './attendance.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../employee/employee.constant';

const router = express.Router();

router.post(
  '/check-in',
  auth(USER_ROLE.Admin, USER_ROLE.Employee),
  AttendanceController.checkIn,
);

router.patch(
  '/check-out/:id',
  auth(USER_ROLE.Admin, USER_ROLE.Employee),
  AttendanceController.checkOut,
);

router.get(
  '/',
  auth(USER_ROLE.Admin, USER_ROLE.Employee),
  AttendanceController.getAllAttendance,
);

router.get(
  '/:id',
  auth(USER_ROLE.Admin, USER_ROLE.Employee),
  AttendanceController.getAllAttendance,
);

router.get(
  '/:id/:date',
  auth(USER_ROLE.Admin, USER_ROLE.Employee),
  AttendanceController.checkEmployeeCheckInToday,
);

router.get(
  '/montlye-attendance/:id/:date',
  auth(USER_ROLE.Admin, USER_ROLE.Employee),
  AttendanceController.getMonthlyAttendanceOfAEmployee,
);

router.get(
  '/montlye/attendance/sheet',
  auth(USER_ROLE.Admin, USER_ROLE.Employee),
  AttendanceController.getMonthlyAttendanceSheet,
);

router.get(
  '/todays/attendance/of/all/employees',
  auth(USER_ROLE.Admin),
  AttendanceController.todaysAttendance,
);

router.patch(
  '/:id',
  auth(USER_ROLE.Admin, USER_ROLE.Employee),
  AttendanceController.updateAttendance,
);

export const attendanceRouter = router;
