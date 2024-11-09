/* eslint-disable prefer-const */
import { calculateWorkHours } from "@/utils/calculateWorkHours";
import { Clock } from "lucide-react";

type TWorkingHourBoxProps = {
  checkInTime?: string;
  checkOutTime?: string;
};

const WorkingHoursBox = ({
  checkInTime,
  checkOutTime,
}: TWorkingHourBoxProps) => {
  // Output the total working hours and minutes

  return (
    <div className="h-[150px] w-[150px] rounded-md bg-[#DEE7FE] p-4 text-black space-y-3 text-left">
      <Clock className="size-10 " />
      <h2 className="text-xl font-bold ">
        {checkInTime && checkOutTime
          ? calculateWorkHours(checkInTime, checkOutTime)
          : "00:00"}
      </h2>
      <p>Woking Hour</p>
    </div>
  );
};

export default WorkingHoursBox;
