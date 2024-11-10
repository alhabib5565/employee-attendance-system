import PageHeader from "@/components/shared/PageHeader";
import { useGetAllLeaveRequestQuery } from "@/redux/api/leave.api";
import { useAppSelector } from "@/redux/hooks";
import { TLeave } from "./type.leaveRequest";
import { TEmployee } from "@/type/user.tpe";
import Loading from "@/components/shared/Loading";

type TEmployeeLeave = TLeave & {
  employeeId: TEmployee;
};

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import showIcon from "../../../../assets/icon-png/Show.png";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MyPagination from "@/components/myUi/MyPagination";

const AllLeaveRequestOnAnEmployee = () => {
  const employeeId = useAppSelector((state) => state.auth.user?.employee_id);

  const { data, isLoading } = useGetAllLeaveRequestQuery({
    employeeId: employeeId,
  });

  if (isLoading) {
    return <Loading />;
  }
  console.log(data?.data);
  return (
    <div className="space-y-6">
      <PageHeader />
      <div className="p-6 border rounded-[16px] grid gap-4">
        <div className="px-6 py-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Leave Request</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div>
          <Table className="border-b">
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="w-[100px]">#</TableHead>
                <TableHead className="text-primary"> Name</TableHead>
                <TableHead className="text-primary font-medium">
                  Start Date
                </TableHead>
                <TableHead className="text-primary font-medium">
                  End Date
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Total Days
                </TableHead>

                <TableHead className="text-primary font-medium">
                  Status
                </TableHead>
                <TableHead className="text-primary font-medium">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((parrent: TEmployeeLeave, index: number) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{parrent.employeeId.name}</TableCell>
                  <TableCell>{parrent.startDate.slice(0, 10)}</TableCell>
                  <TableCell>{parrent.endDate.slice(0, 10)}</TableCell>
                  <TableCell>
                    {new Date(parrent.endDate).getDate() -
                      new Date(parrent.startDate).getDate()}
                  </TableCell>
                  <TableCell>
                    <span className="px-3 rounded-[12px] py-0.5 bg-secondary text-[#667085] text-sm font-medium flex items-center gap-2 w-fit">
                      <span className="size-0.5 p-0.5 rounded-full bg-[#667085]"></span>
                      {parrent.status}
                    </span>
                  </TableCell>
                  <TableCell>{parrent.leaveType}</TableCell>
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

export default AllLeaveRequestOnAnEmployee;
