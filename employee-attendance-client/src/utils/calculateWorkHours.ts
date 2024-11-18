import { TBreak } from "@/components/pages/dashboard/employee/attendance/type.attendance";

export const calculateWorkHours = (
  checkInTime?: string,
  checkOutTime?: string,
  breaks?: TBreak[]
) => {
  console.log({ breaks, checkInTime, checkOutTime });
  const convertToDate = (timeString: string): Date => {
    const [time, modifier] = timeString.split(" ");

    // eslint-disable-next-line prefer-const
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    const date = new Date(1970, 0, 1, hours, minutes);
    return date;
  };
  const totalBreakInMs = calculateTotalBreakInMinutes(breaks || []);
  console.log({ totalBreakInMs });
  let totalHours;
  let totalMinutes;
  if (checkInTime && checkOutTime) {
    const checkInDate: Date = convertToDate(checkInTime);
    const checkOutDate: Date = convertToDate(checkOutTime);
    const differenceInM: number =
      (checkOutDate.getTime() - checkInDate.getTime() - totalBreakInMs) /
      (1000 * 60);
    totalHours = Math.floor(differenceInM / 60);
    totalMinutes = Math.floor(differenceInM % 60);
  }
  return `${totalHours}H ${totalMinutes}M`;
};

export const calculateTotalBreakInMinutes = (breaks: TBreak[] | []) => {
  const totalBreakInMinutes = breaks?.reduce((prev, current) => {
    const startTime = new Date(current.startBreak || "").getTime();
    const endTime = new Date(current?.endBreak || "").getTime() || startTime;

    const durationInMinute = endTime - startTime;

    return prev + durationInMinute;
  }, 0);

  return totalBreakInMinutes > 0 ? totalBreakInMinutes : 0;
};
