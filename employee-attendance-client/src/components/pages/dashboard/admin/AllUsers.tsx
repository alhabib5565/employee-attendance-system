import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MyPagination from "@/components/myUi/MyPagination";
import PageHeader from "@/components/shared/PageHeader";
import { useGetAllUsersQuery } from "@/redux/api/user.api";
import { Link } from "react-router-dom";
import { TEmployee } from "@/type/user.tpe";

const AllUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery({});

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <PageHeader />
      <div className="p-6 border rounded-[16px] grid gap-4">
        <div className="px-6 py-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Employees</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div>
          <Table className="border-b">
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="w-[100px] text-primary font-medium">
                  User ID
                </TableHead>
                <TableHead className="text-primary">Name</TableHead>
                <TableHead className="text-primary font-medium">
                  Email
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Designation
                </TableHead>
                <TableHead className="text-primary font-medium">
                  User Role
                </TableHead>

                <TableHead className="text-primary font-medium text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((user: TEmployee) => (
                <TableRow key={user._id}>
                  <TableCell>{user.employeeId}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.designation}</TableCell>

                  <TableCell>
                    <span className="px-3 rounded-[12px] py-0.5 bg-secondary text-[#667085] text-sm font-medium flex items-center gap-2 w-fit">
                      <span className="size-0.5 p-0.5 rounded-full bg-[#667085]"></span>{" "}
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="flex gap-4 justify-end">
                    <div className="justify-end items-center flex text-white">
                      <Button
                        disabled
                        className="px-1.5 py-1 bg-[#6b7280] h-fit rounded-none  rounded-tl rounded-bl text-center  text-xs font-normal leading-[18px] tracking-tight"
                      >
                        View
                      </Button>
                      <Button className="px-1.5 py-1 bg-[#4383ce] h-fit rounded-none text-center  text-xs font-normal leading-[18px] tracking-tight">
                        <Link to={`/user-management/edit-user/${user._id}`}>
                          Edit
                        </Link>
                      </Button>
                      <Button
                        disabled
                        className="px-1.5 py-1 bg-red-600 h-fit rounded-none rounded-tr rounded-br text-center  text-xs font-normal leading-[18px] tracking-tight"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="px-6 py-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow text-sm">Showing 1 to 3 of 3 entries</h3>
          <MyPagination />
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
