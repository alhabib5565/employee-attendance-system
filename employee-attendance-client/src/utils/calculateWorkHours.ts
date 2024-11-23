import { TDailyWorkSessions } from "@/components/pages/dashboard/employee/attendance/type.attendance";

export const calculateDurationInM = (
  checkInTime: Date,
  checkOutTime?: Date
) => {
  const checkIn = new Date(checkInTime || "").getTime();
  const checkOut = new Date(checkOutTime || "").getTime() || checkIn;
  const durationInM = checkOut - checkIn;
  return durationInM / (1000 * 60);
};

export const calculateTotalWorkTimes = (
  dailyWorkSessions: TDailyWorkSessions[]
) => {
  const workTimeInMinutes = dailyWorkSessions?.reduce((prev, current) => {
    const durationInM = calculateDurationInM(
      current.checkInTime,
      current.checkOutTime
    );

    return prev + durationInM;
  }, 0);
  return workTimeInMinutes;
};

export const totalWorkTimeString = (
  dailyWorkSessions: TDailyWorkSessions[]
) => {
  const workTimeInMinutes = calculateTotalWorkTimes(dailyWorkSessions);
  const totalHours = Math.floor(workTimeInMinutes / 60);
  const totalMinutes = Math.floor(workTimeInMinutes % 60);

  return workTimeInMinutes > 0 ? `${totalHours}H ${totalMinutes}M` : 0;
};
