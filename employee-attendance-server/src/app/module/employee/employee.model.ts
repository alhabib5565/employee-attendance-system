import { model, Schema } from 'mongoose';
import { TEmployee } from './employee.interface';
import { USER_ROLE, USER_STATUS } from './employee.constant';
import bcrypt from 'bcrypt';
import config from '../../config';

const employeeSchema = new Schema<TEmployee>(
  {
    employeeId: {
      type: String,
      required: [true, 'EmployeeId is Required'],
      unique: true,
    },
    name: { type: String, required: true },
    designation: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: {
      type: String,
      enum: Object.keys(USER_ROLE),
      default: USER_ROLE.Employee,
    },
    status: {
      type: String,
      enum: Object.keys(USER_STATUS),
      default: USER_STATUS.Active,
    },
    isDeleted: { type: Boolean, default: false },
    phone: { type: Number },
    profileImage: { type: String },
    passwordChangeAt: { type: Date },
    leave_quota: { type: Number, default: 20 },
    leave_taken: { type: Number, default: 0 },
  },
  { timestamps: true },
);

employeeSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  this.password = hashedPassword;
  next();
});
export const Employee = model('Employee', employeeSchema);
