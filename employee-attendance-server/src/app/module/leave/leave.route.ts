import express from 'express';
import { LeaveController } from './leave.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../employee/employee.constant';

const router = express.Router();

router.post(
  '/request-for-leave',
  auth(USER_ROLE.Admin, USER_ROLE.Employee),
  LeaveController.requestForLeave,
);
router.get('/', LeaveController.getAllLeave);
router.get('/:id', LeaveController.getSingleLeave);
router.patch('/:id', LeaveController.updateLeave);
router.patch(
  '/:id/update-leave-status',
  auth(USER_ROLE.Admin),
  LeaveController.leaveStatusUpdate,
);

export const leaveRouter = router;
