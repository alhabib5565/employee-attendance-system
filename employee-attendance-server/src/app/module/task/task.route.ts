import express from 'express';
import { TaskController } from './task.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../employee/employee.constant';

const router = express.Router();

router.post(
  '/create-task',
  auth(USER_ROLE.Admin, USER_ROLE.Employee),
  TaskController.createTask,
);

router.get(
  '/',
  auth(USER_ROLE.Admin, USER_ROLE.Employee),
  TaskController.getAllTask,
);

router.get(
  '/:id',
  auth(USER_ROLE.Admin, USER_ROLE.Employee),
  TaskController.getSingleTask,
);

router.patch(
  '/:id',
  auth(USER_ROLE.Admin, USER_ROLE.Employee),
  TaskController.updateTask,
);

router.patch(
  '/add-work-session/:id',
  auth(USER_ROLE.Admin, USER_ROLE.Employee),
  TaskController.addWorkSessions,
);

router.patch(
  '/end-work-session/:id',
  auth(USER_ROLE.Admin, USER_ROLE.Employee),
  TaskController.endWorkSessions,
);

export const taskRouter = router;
