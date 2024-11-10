import express from 'express';
import { LeaveController } from './leave.controller';

const router = express.Router();

router.post('/request-for-leave', LeaveController.requestForLeave);
router.get('/', LeaveController.getAllLeave);
router.get('/:id', LeaveController.getSingleLeave);
router.patch('/:id', LeaveController.updateLeave);

export const leaveRouter = router;
