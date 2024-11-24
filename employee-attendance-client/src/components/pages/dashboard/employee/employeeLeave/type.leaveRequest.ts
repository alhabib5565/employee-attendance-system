export type TLeave = {
  _id: string;
  employeeId: string;
  description: string;
  leaveType: "Sick" | "Other";
  startDate: string;
  endDate: string;
  status: "Pending" | "Approved" | "Rejected";
  leaveDuration: number;
  updatedAt: string;
  createdAt: string;
};
