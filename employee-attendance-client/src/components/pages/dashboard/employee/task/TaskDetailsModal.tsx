import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TTask, TWorkSession } from "./type.task";
import { calculateTotalWorkSessionTime } from "./task.utils";

const TaskDetailsModal = ({ task }: { task: TTask }) => {
  const formateTime = (date: Date | undefined) => {
    return new Date(date || "")?.toLocaleString("en-GB", {
      day: "numeric",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getTotalTimeAtAWorkSession = (workSession: TWorkSession) => {
    const startTime = new Date(workSession.startTime || "").getTime();
    const endTime = new Date(workSession.endTime || "").getTime() || startTime;
    const durationInMinute = (endTime - startTime) / (1000 * 60);
    const hours = Math.floor(durationInMinute / 60);
    const minutes = Math.round(durationInMinute % 60);

    return `${hours} H ${minutes} M`;
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-500">View</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[600px] max-h-[420px] h-full overflow-y-scroll w-full">
          <DialogHeader>
            <DialogTitle className="border-b-[1px] pb-2 mb-4">
              Task Details
            </DialogTitle>
            <div className="grid gap-8">
              <div>
                <p className="text-gray-800 font-medium leading-normal tracking-tight">
                  <b>Title:</b> {task.title}
                </p>
                <p className="text-gray-800 font-medium leading-normal tracking-tight">
                  <b>Description:</b> {task.description}
                </p>
              </div>
              <div className="py-2 bg-white rounded-lg shadow border border-gray-100 flex-col justify-start items-start gap-[5px]">
                <h3 className="px-6 py-1">Work Sessions</h3>
                <div>
                  <Table className="border-b">
                    <TableHeader className="bg-secondary w-full">
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>

                        <TableHead className="text-primary font-medium">
                          Start Time
                        </TableHead>
                        <TableHead className="text-primary font-medium">
                          End Time
                        </TableHead>

                        <TableHead className="text-primary font-medium text-right">
                          Work Time
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {task?.workSessions?.map((session, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              {formateTime(session.startTime)}
                            </TableCell>
                            <TableCell>
                              {session.endTime
                                ? formateTime(session.startTime)
                                : "Working..."}
                            </TableCell>

                            <TableCell className="text-right">
                              {getTotalTimeAtAWorkSession(session)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                  <p className="flex justify-end px-4 space-x-2">
                    <b>Total: </b>{" "}
                    <span>
                      {calculateTotalWorkSessionTime(task.workSessions)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskDetailsModal;
