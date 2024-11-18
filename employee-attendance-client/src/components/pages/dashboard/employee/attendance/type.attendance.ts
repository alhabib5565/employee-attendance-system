export type TBreak = {
  startBreak: Date;
  endBreak?: Date;
};
export type TAttendance = {
  _id: string;
  employeeId: string;
  checkInDate: Date;
  checkInTime: string;
  checkOutTime: string;
  isAbsent: false;
  breaks: TBreak[];
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
};
