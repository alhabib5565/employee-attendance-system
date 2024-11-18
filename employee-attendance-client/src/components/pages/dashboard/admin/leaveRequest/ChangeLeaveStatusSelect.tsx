/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { TLeave } from "../../employee/employeeLeave/type.leaveRequest";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditLeavesMutation } from "@/redux/api/leave.api";

const ChangeLeaveStatusSelect = ({ leave }: { leave: TLeave }) => {
  const [editLeave, { isLoading: editLeaveLoading }] = useEditLeavesMutation();

  const handleChangeTaskStatus = async (id: string, value: Partial<TLeave>) => {
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await editLeave({
        id,
        data: value,
      }).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
    } catch (error: any) {
      console.log(error?.data?.message);
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };

  return (
    <Select
      onValueChange={(value: any) =>
        handleChangeTaskStatus(leave._id, { status: value })
      }
      value={leave.status}
      //   leave.status === "Approved"
      disabled={editLeaveLoading}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Approved">Approved</SelectItem>
          <SelectItem value="Rejected">Rejected</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ChangeLeaveStatusSelect;
