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
import { useMonthlyAttendanceOfAEmployeeQuery } from "@/redux/api/attendance.api";
import { useAppSelector } from "@/redux/hooks";
import { calculateWorkHours } from "@/utils/calculateWorkHours";

export type TAttendance = {
  isHoliday?: boolean;
  dayOffMonth?: number;
  isAbsent?: boolean;
  checkInDate?: string;
  checkInTime?: string;
  checkOutTime?: string;
};

const Attendance = () => {
  const employeeId = useAppSelector((state) => state.auth.user?.employee_id);

  const { data, isLoading } = useMonthlyAttendanceOfAEmployeeQuery({
    id: employeeId,
    date: new Date().toUTCString(),
  });
  return (
    <div className="space-y-6">
      <div className="p-6 border rounded-[16px] grid gap-4">
        <div className="px-6 py-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Attendance</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div className="h-[400px] overflow-y-scroll">
          <Table className="border-b">
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="text-primary">Date</TableHead>
                <TableHead className="text-primary">Check In</TableHead>
                <TableHead className="text-primary font-medium">
                  Check Out
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Hours Worked
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Status
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Holiday
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <div className="h-32 w-full flex items-center justify-center">
                  loading...
                </div>
              ) : (
                <>
                  {data?.data?.map((attendance: TAttendance, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        {attendance?.checkInDate?.slice(0, 10)}
                      </TableCell>
                      <TableCell>{attendance?.checkInTime}</TableCell>
                      <TableCell>{attendance?.checkOutTime}</TableCell>
                      <TableCell>
                        {attendance.checkInTime && attendance.checkOutTime
                          ? calculateWorkHours(
                              attendance.checkInTime,
                              attendance.checkOutTime
                            )
                          : "00:00"}
                      </TableCell>
                      <TableCell>
                        {!attendance.isHoliday && (
                          <>
                            {attendance?.isAbsent ? (
                              <span className="px-3 rounded-[12px] py-0.5 bg-[#fd7e1426] text-[#fd7e14] text-sm font-medium flex items-center gap-2 w-fit">
                                Absent
                              </span>
                            ) : (
                              <span className="px-3 rounded-[12px] py-0.5 bg-[#19875426] text-[#198754] text-sm font-medium flex items-center gap-2 w-fit">
                                Present
                              </span>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {attendance.isHoliday && (
                          <span className="px-3 rounded-[12px] py-0.5 bg-red-600 bg-opacity-15 text-red-600 text-sm font-medium flex items-center gap-2 w-fit">
                            Holyday
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
