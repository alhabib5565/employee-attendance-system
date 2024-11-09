export const formateDateWithHrAndMM = (dateStr: string) => {
  const targetDate = new Date(dateStr);

  // Format the date to "YYYY-MM-DD hh:mm AM/PM"
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return targetDate.toLocaleString("en-US", options).replace(",", "");
};
