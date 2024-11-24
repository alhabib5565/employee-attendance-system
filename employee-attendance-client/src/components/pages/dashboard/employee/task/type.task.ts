import { TEmployee } from "@/type/user.tpe";

export type TWorkSession = {
  startTime?: string;
  endTime?: string;
};

export type TTask = {
  _id: string;
  title: string;
  description: string;
  createdBy: TEmployee;
  status: "Open" | "In_Progress" | "Done";
  workSessions: [] | TWorkSession[];
  createdAt: Date;
  updatedAt: Date;
};
