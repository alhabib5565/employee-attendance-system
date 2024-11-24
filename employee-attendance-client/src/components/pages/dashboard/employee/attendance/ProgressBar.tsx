import {
  calculateDurationInM,
  calculateTotalWorkTimes,
} from "@/utils/calculateWorkHours";
import { TDailyWorkSessions } from "./type.attendance";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formateCurrentTime } from "@/components/shared/checkInCheckOut/checkInCheckOut.utils";

type TProgressBar = { dailyWorkSessions: TDailyWorkSessions[] };

const ProgressBar = ({ dailyWorkSessions }: TProgressBar) => {
  const totalWorkTime = calculateTotalWorkTimes(dailyWorkSessions);
  return (
    <div className="relative w-full h-2 flex gap-1 max-w-[600px] mx-auto">
      {dailyWorkSessions.map((session, index) => {
        if (!session.checkOutTime)
          return (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="h-full w-10 bg-yellow-500 inline-block rounded"></button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Incomplete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        const duration = calculateDurationInM(
          session.checkInTime,
          session.checkOutTime
        );
        const width = (duration / totalWorkTime) * 100;

        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="h-full bg-green-500 inline-block rounded"
                  style={{ width: `${width}%` }}
                ></button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {formateCurrentTime(new Date(session.checkInTime))} -{" "}
                  {formateCurrentTime(new Date(session.checkOutTime))}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

export default ProgressBar;
