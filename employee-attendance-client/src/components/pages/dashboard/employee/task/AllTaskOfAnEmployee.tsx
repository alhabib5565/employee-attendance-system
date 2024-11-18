/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/shared/Loading";
import {
  useAddWorkSessionMutation,
  useEditTasksMutation,
  useEndWorkSessionMutation,
  useGetAllTaskQuery,
} from "@/redux/api/task.api";
import { useAppSelector } from "@/redux/hooks";
import PageHeader from "@/components/shared/PageHeader";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MyPagination from "@/components/myUi/MyPagination";
import { TTask } from "./type.task";
import { toast } from "sonner";
import {
  calculateTotalWorkSessionTime,
  isAlreadyStartAWorkSession,
} from "./task.utils";
import TaskDetailsModal from "./TaskDetailsModal";
const AllTaskOfAnEmployee = () => {
  const employeeId = useAppSelector((state) => state.auth.user?.employee_id);

  // api call
  const { data, isLoading } = useGetAllTaskQuery({
    createdBy: employeeId,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <PageHeader />
      <div className="p-6 border rounded-[16px] grid gap-4">
        <div className="px-6 py-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Task</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div>
          <Table className="border-b">
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead className="text-primary font-medium">
                  Task Title
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Description
                </TableHead>

                <TableHead className="text-primary font-medium">
                  Status
                </TableHead>

                <TableHead className="text-primary font-medium ">
                  Work Time
                </TableHead>
                {/* <TableHead className="text-primary font-medium ">
                  Work Date
                </TableHead> */}
                <TableHead className="text-primary font-medium">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((task: TTask, index: number) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="truncate max-w-[200px]">
                    {task.title}
                  </TableCell>
                  <TableCell className="truncate max-w-[300px]">
                    {task.description}
                  </TableCell>

                  <TableCell>
                    <ChangeStatusSelect task={task} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {calculateTotalWorkSessionTime(task.workSessions)}
                  </TableCell>
                  {/* <TableCell className="flex flex-wrap gap-2 max-w-[330px]">
                    {task.workSessions.map(
                      (workSession: TWorkSession, index: number) => (
                        <span key={index}>
                          {new Date(workSession.startTime || "").toLocaleString(
                            "en-GB",
                            {
                              weekday: "short", // "Wed"
                              month: "short",
                            }
                          )}
                          {index !== task.workSessions.length - 1 && ","}
                        </span>
                      )
                    )}
                  </TableCell> */}

                  <TableCell>
                    <ActionButton task={task} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="px-6 py-4 flex justify-end items-center gap-4 ">
          <MyPagination />
        </div>
      </div>
    </div>
  );
};

export default AllTaskOfAnEmployee;

const ChangeStatusSelect = ({ task }: { task: TTask }) => {
  const [editTask, { isLoading: editTaskLoadin }] = useEditTasksMutation();

  const handleChangeTaskStatus = async (id: string, value: Partial<TTask>) => {
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await editTask({
        id,
        data: value,
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

  return (
    <Select
      onValueChange={(value: any) =>
        handleChangeTaskStatus(task._id, { status: value })
      }
      value={task.status}
      disabled={task.status === "Done" || editTaskLoadin}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Open">Open</SelectItem>
          <SelectItem value="In_Progress">In Progress</SelectItem>
          <SelectItem value="Done">Done</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const ActionButton = ({ task }: { task: TTask }) => {
  const [addWorkSession, { isLoading: addWorkSessionLoading }] =
    useAddWorkSessionMutation();
  const [endWorkSession, { isLoading: endWorkSessionLoading }] =
    useEndWorkSessionMutation();

  // handler
  const handleAddWorkSession = async (id: string) => {
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await addWorkSession({
        id,
        data: { startTime: new Date() },
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

  const handleEndWorkSession = async (id: string) => {
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await endWorkSession({
        id,
        data: { endTime: new Date() },
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
    <div className="flex gap-4">
      {isAlreadyStartAWorkSession(task.workSessions) ? (
        <Button
          disabled={endWorkSessionLoading}
          onClick={() => handleEndWorkSession(task._id)}
          className="bg-red-600 hover:bg-red-500"
        >
          stop
        </Button>
      ) : (
        <Button
          disabled={addWorkSessionLoading}
          onClick={() => handleAddWorkSession(task._id)}
        >
          Start
        </Button>
      )}
      <TaskDetailsModal task={task} />
    </div>
  );
};
