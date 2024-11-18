import PageHeader from "@/components/shared/PageHeader";
import { useGetAllLeaveRequestQuery } from "@/redux/api/leave.api";
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
import { TLeave } from "../../employee/employeeLeave/type.leaveRequest";
import ChangeLeaveStatusSelect from "./ChangeLeaveStatusSelect";

const AllLeaveRequest = () => {
  const { data, isLoading } = useGetAllLeaveRequestQuery({});

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
              {data?.data?.map((leave: TEmployeeLeave, index: number) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{leave.employeeId.name}</TableCell>
                  <TableCell>{leave.startDate.slice(0, 10)}</TableCell>
                  <TableCell>{leave.endDate.slice(0, 10)}</TableCell>
                  <TableCell>
                    {new Date(leave.endDate).getDate() -
                      new Date(leave.startDate).getDate()}
                  </TableCell>
                  <TableCell>
                    <ChangeLeaveStatusSelect leave={leave} />
                  </TableCell>
                  <TableCell>{leave.leaveType}</TableCell>
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
export default AllLeaveRequest;
