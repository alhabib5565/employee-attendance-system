import { TEmployee } from '../employee/employee.interface';

export type TLoginEmployee = Pick<TEmployee, 'email' | 'password'>;

export type TVerifyEmailPayload = {
  verificationCode: number;
  email: string;
};
