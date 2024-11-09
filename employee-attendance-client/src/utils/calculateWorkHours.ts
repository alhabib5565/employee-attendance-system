export const calculateWorkHours = (
  checkInTime?: string,
  checkOutTime?: string
) => {
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

  let totalHours;
  let totalMinutes;
  if (checkInTime && checkOutTime) {
    const checkInDate: Date = convertToDate(checkInTime);
    const checkOutDate: Date = convertToDate(checkOutTime);
    const differenceInMs: number =
      checkOutDate.getTime() - checkInDate.getTime();
    totalHours = Math.floor(differenceInMs / (1000 * 60 * 60));
    totalMinutes = Math.floor(
      (differenceInMs % (1000 * 60 * 60)) / (1000 * 60)
    );
  }
  return `${totalHours}: ${totalMinutes} H`;
};
