/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Crosshair } from "lucide-react";
import { TAttendance } from "../attendance/type.attendance";
import { toast } from "sonner";
import {
  useEndBreakMutation,
  useStartBreakMutation,
} from "@/redux/api/attendance.api";
import { calculateTotalBreakInMinutes } from "@/utils/calculateWorkHours";

type TBreakBoxProps = {
  attendance_id: string;
  todayAttendance: TAttendance;
};

const BreakBox = ({ todayAttendance }: TBreakBoxProps) => {
  const [startBreak, { isLoading: isBreakStartLoading }] =
    useStartBreakMutation();
  const [endBreak, { isLoading: isBreakEndLoading }] = useEndBreakMutation();

  const handleStartBreak = async () => {
    const toastId = toast.loading("Processing your request...");

    try {
      const res = await startBreak({
        id: todayAttendance._id,
        data: { startBreak: new Date() },
      }).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error?.data?.message);
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };
  console.log(todayAttendance);
  const handleEndBreak = async () => {
    const toastId = toast.loading("Processing your request...");

    try {
      const res = await endBreak({
        id: todayAttendance._id,
        data: { endBreak: new Date() },
      }).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error?.data?.message);
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };

  const disabled =
    !todayAttendance ||
    isBreakEndLoading ||
    isBreakStartLoading ||
    !!todayAttendance?.checkOutTime;

  const breaks = todayAttendance?.breaks;
  const isAlreadyInABreak =
    breaks?.length > 0 && breaks?.some((brk) => !brk.endBreak);
  const totalBreakInM = calculateTotalBreakInMinutes(breaks) / (1000 * 60);
  const hours = Math.floor(totalBreakInM / 60);
  const minutes = Math.round(totalBreakInM % 60);

  return (
    <div>
      {todayAttendance?.checkOutTime ? (
        <div
          className={cn(
            "h-[150px] w-[150px] rounded-md bg-red-200 p-4 text-black space-y-3 text-left "
          )}
        >
          <Crosshair className="size-10" />
          <h3 className="text-xl font-bold text-black">
            {hours}H {minutes}M
          </h3>
          <p>Total Break</p>
        </div>
      ) : (
        <>
          {isAlreadyInABreak ? (
            <button
              onClick={handleEndBreak}
              disabled={disabled}
              className={cn(
                "h-[150px] w-[150px] rounded-md bg-red-200 p-4 text-black space-y-3 text-left ",
                { "cursor-not-allowed bg-opacity-80": disabled }
              )}
            >
              <Crosshair className="size-10" />
              <h3 className="text-xl font-bold">
                {hours}H {minutes}M
              </h3>
              <span>End break</span>
            </button>
          ) : (
            <button
              onClick={handleStartBreak}
              disabled={disabled}
              className={cn(
                "h-[150px] w-[150px] rounded-md bg-yellow-200 p-4 text-black space-y-3 text-left ",
                { "cursor-not-allowed bg-opacity-80": disabled }
              )}
            >
              <Crosshair className="size-10" />
              <h3 className="text-xl font-bold">
                {hours}H {minutes}M
              </h3>
              <p>Take Break</p>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default BreakBox;
