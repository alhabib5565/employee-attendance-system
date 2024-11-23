import express from 'express';
import { EmployeeController } from './employee.controller';
import { upload } from '../../utils/sendFileToCloudinary';

const router = express.Router();

router.post('/create-employee', EmployeeController.createEmployee);
router.get('/', EmployeeController.getAllEmployee);
router.patch(
  '/upload-profile-photo/:id',
  upload.single('file'),
  EmployeeController.uploadProfilePhoto,
);
router.get('/:id', EmployeeController.getSingleEmployee);
router.patch('/:id', EmployeeController.updateEmployee);

export const employee_router = router;
