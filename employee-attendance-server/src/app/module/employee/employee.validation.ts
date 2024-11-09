import { z } from 'zod';
import { USER_ROLE, USER_STATUS } from './employee.constant';

const createEmployeeValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .min(1, { message: 'Password is required' }),
  role: z
    .enum(Object.keys(USER_ROLE) as [string, ...string[]], {
      message: 'Invalid role',
    })
    .default('Customer'),
  status: z
    .enum(Object.keys(USER_STATUS) as [string, ...string[]], {
      message: 'Invalid status',
    })
    .default('Active'),
  isDeleted: z.boolean().default(false),
});

export const EmployeeValidation = {
  createEmployeeValidationSchema,
};
