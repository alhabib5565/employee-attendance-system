import { TDailyWorkSessions } from "@/components/pages/dashboard/employee/attendance/type.attendance";
import { cn } from "@/lib/utils";
import { useCheckOutMutation } from "@/redux/api/attendance.api";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { checkActiveSession } from "./checkInCheckOut.utils";

type TCheckOutBoxProps = {
  attendance_id: string;
  dailyWorkSessions: TDailyWorkSessions[];
};

const CheckOutBox = ({
  attendance_id,
  dailyWorkSessions,
}: TCheckOutBoxProps) => {
  const [checkOut] = useCheckOutMutation();

  const handleCheckOut = async () => {
    const toastId = toast.loading("Processing your check-out request...");
    try {
      const date = new Date();

      const res = await checkOut({
        id: attendance_id,
        data: { checkOutTime: date },
      }).unwrap();
      toast.success(res.message || "Check out successful!", {
        id: toastId,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error?.data?.message);
      toast.error(
        error?.data?.message || "Check out failed. Please try again",
        {
          id: toastId,
        }
      );
    }
  };

  const activeSession = checkActiveSession(dailyWorkSessions);
  return (
    <button
      disabled={!activeSession}
      onClick={handleCheckOut}
      className={cn(
        "h-[150px] w-[150px] rounded-md bg-[#FDEDD3] p-4 text-black space-y-3 text-left",
        { "cursor-not-allowed bg-opacity-70": !activeSession }
      )}
    >
      <LogOut className="size-10 " />
      <h2 className="text-xl font-bold ">
        {/* {checkOutTime ? checkOutTime : "00:00"} */}
      </h2>
      <p>Checked Out</p>
    </button>
  );
};

export default CheckOutBox;
