import { TWorkSession } from "./type.task";

export const isAlreadyStartAWorkSession = (workSession: TWorkSession[]) => {
  return workSession.find((session) => !session?.endTime) ? true : false;
};

export const calculateTotalWorkSessionTime = (workSession: TWorkSession[]) => {
  const totalDurationInMinute = workSession?.reduce((prev, current) => {
    const startTime = new Date(current.startTime || "").getTime();
    const endTime = new Date(current.endTime || "").getTime() || startTime; // ekta session jokhon unfinished thake tokhon "endTime" take na

    const durationInMinute = (endTime - startTime) / (1000 * 60);

    return prev + durationInMinute;
  }, 0);

  const hours = Math.floor(totalDurationInMinute / 60);
  const minutes = Math.round(totalDurationInMinute % 60);

  return `${hours} H ${minutes} M`;
};
