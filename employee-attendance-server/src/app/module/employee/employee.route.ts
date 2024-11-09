import express from 'express';
import { EmployeeController } from './employee.controller';

const router = express.Router();

router.post('/create-employee', EmployeeController.createEmployee);
router.get('/', EmployeeController.getAllEmployee);
router.get('/:id', EmployeeController.getSingleEmployee);
router.patch('/:id', EmployeeController.updateEmployee);

export const employee_router = router;
