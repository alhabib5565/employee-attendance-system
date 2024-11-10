export type TLeave = {
  employeeId: string;
  description: string;
  leaveType: "Sick" | "Other";
  startDate: string;
  endDate: string;
  status: "Pending" | "Approved" | "Rejected";
};
