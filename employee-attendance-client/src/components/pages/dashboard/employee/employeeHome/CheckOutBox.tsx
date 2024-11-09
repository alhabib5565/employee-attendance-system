import { cn } from "@/lib/utils";
import { useEditAttendancesMutation } from "@/redux/api/attendance.api";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

type TCheckOutBoxProps = {
  attendance_id: string;
  checkOutTime?: string | undefined;
};

const CheckOutBox = ({ attendance_id, checkOutTime }: TCheckOutBoxProps) => {
  const [checkOut] = useEditAttendancesMutation();

  const handleCheckOut = async () => {
    const toastId = toast.loading("Processing your check-out request...");
    try {
      const date = new Date();
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const res = await checkOut({
        id: attendance_id,
        data: { checkOutTime: formattedTime },
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

  return (
    <button
      disabled={!!checkOutTime}
      onClick={handleCheckOut}
      className={cn(
        "h-[150px] w-[150px] rounded-md bg-[#FDEDD3] p-4 text-black space-y-3 text-left",
        { "cursor-not-allowed bg-opacity-80": checkOutTime }
      )}
    >
      <LogOut className="size-10 " />
      <h2 className="text-xl font-bold ">
        {checkOutTime ? checkOutTime : "00:00"}
      </h2>
      <p>Checked Out</p>
    </button>
  );
};

export default CheckOutBox;
