import { TEmployee } from "@/type/user.tpe";

export type TWorkSession = {
  startTime?: Date;
  endTime?: Date;
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
