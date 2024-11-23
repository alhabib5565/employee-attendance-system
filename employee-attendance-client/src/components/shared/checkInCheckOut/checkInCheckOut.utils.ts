import { TDailyWorkSessions } from "@/components/pages/dashboard/employee/attendance/type.attendance";

export const checkActiveSession = (dailyWorkSessions: TDailyWorkSessions[]) => {
  return (
    dailyWorkSessions?.length > 0 &&
    dailyWorkSessions?.find(
      (dailyWorkSession) => !dailyWorkSession.checkOutTime
    )
  );
};

export const formateCurrentTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
