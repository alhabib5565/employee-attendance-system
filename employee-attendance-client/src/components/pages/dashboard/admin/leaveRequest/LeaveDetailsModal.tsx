import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TLeave } from "../../employee/employeeLeave/type.leaveRequest";
import { TEmployee } from "@/type/user.tpe";
import { formateDateWithHrAndMM } from "@/utils/common";
type TEmployeeLeave = TLeave & {
  employeeId: TEmployee;
};
function LeaveDetailsModal({ leave }: { leave: TEmployeeLeave }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-500">View</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[600px] max-h-[420px] h-full overflow-y-scroll w-full">
          <DialogHeader>
            <DialogTitle className="border-b-[1px] pb-2 mb-4">
              Leave Request Details
            </DialogTitle>

            <div className="space-y-3">
              <p className="text-gray-800 font-medium leading-normal tracking-tight">
                <b>Description:</b> <span>{leave.description}</span>
              </p>
              <p className="text-gray-800 font-medium leading-normal tracking-tight">
                <b>Leave Type:</b> <span>{leave.leaveType}</span>
              </p>
              <p className="text-gray-800 font-medium leading-normal tracking-tight">
                <b>Name:</b> <span>{leave.employeeId?.name}</span>
              </p>
              <p className="text-gray-800 font-medium leading-normal tracking-tight">
                <b>Duration:</b> <span>{leave.leaveDuration}</span>
              </p>
              <p className="text-gray-800 font-medium leading-normal tracking-tight">
                <b>Start Date:</b> <span>{leave.startDate.slice(0, 10)}</span>
              </p>
              <p className="text-gray-800 font-medium leading-normal tracking-tight">
                <b>End Date:</b> <span>{leave.endDate.slice(0, 10)}</span>
              </p>
              <p className="text-gray-800 font-medium leading-normal tracking-tight">
                <b>Status:</b> <span>{leave.status}</span>
              </p>
              <p className="text-gray-800 font-medium leading-normal tracking-tight">
                <b>Remaining Leave:</b>{" "}
                <span>
                  {leave?.employeeId?.leave_quota -
                    leave?.employeeId?.leave_taken}{" "}
                  Days
                </span>
              </p>
              <p className="text-gray-800 font-medium leading-normal tracking-tight">
                <b>Creation Date:</b>{" "}
                <span>{formateDateWithHrAndMM(leave.createdAt)}</span>
              </p>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default LeaveDetailsModal;
