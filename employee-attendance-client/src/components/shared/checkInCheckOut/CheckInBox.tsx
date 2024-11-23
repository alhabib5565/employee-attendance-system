import { cn } from "@/lib/utils";
import { useCheckInMutation } from "@/redux/api/attendance.api";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TDailyWorkSessions } from "../../pages/dashboard/employee/attendance/type.attendance";
import {
  checkActiveSession,
  formateCurrentTime,
} from "./checkInCheckOut.utils";

type TCheckInBoxProps = {
  employeeId: string;
  dailyWorkSessions: TDailyWorkSessions[];
};

const CheckInBox = ({ dailyWorkSessions }: TCheckInBoxProps) => {
  const [formattedTime, setFormattedTime] = useState("00:00");

  const activeSession = checkActiveSession(dailyWorkSessions);

  //api call
  const [checkIn] = useCheckInMutation();

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const currentTime = formateCurrentTime(date);
      setFormattedTime(currentTime);
    };
    updateTime();
    const intervalId = setInterval(updateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleCheckIn = async () => {
    const toastId = toast.loading("Processing your check-in request...");
    try {
      const date = new Date();

      const res = await checkIn({
        checkInDate: date,
        checkInTime: date,
      }).unwrap();
      toast.success(res.message || "Check In successful!", {
        id: toastId,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error?.data?.message);
      toast.error(error?.data?.message || "Check in failed. Please try again", {
        id: toastId,
      });
    }
  };

  return (
    <button
      disabled={!!activeSession}
      onClick={handleCheckIn}
      className={cn(
        "h-[150px] w-[150px] rounded-md bg-[#83B398] p-4 text-white space-y-3 text-left",
        { "cursor-not-allowed bg-opacity-80": activeSession }
      )}
    >
      <LogOut className="size-10 " />
      <h2 className="text-xl font-bold ">
        {activeSession
          ? formateCurrentTime(new Date(activeSession.checkInTime))
          : formattedTime}
      </h2>
      <p>{activeSession ? "Checked IN" : "Not Checked IN"}</p>
    </button>
  );
};

export default CheckInBox;
