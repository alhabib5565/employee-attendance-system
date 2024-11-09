import { Employee } from './employee.model';

export const generateEmployeeId = async () => {
  let currentId = '0';

  const lastEmployeeId = await Employee.findOne({}, { employeeId: 1 }).sort({
    createdAt: -1,
  });
  if (lastEmployeeId) {
    currentId = lastEmployeeId.employeeId;
  }
  return (Number(currentId) + 1).toString().padStart(4, '0');
};
