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
import { useGetTodaysAttendanceQuery } from "@/redux/api/attendance.api";
import { TEmployee } from "@/type/user.tpe";
import { totalWorkTimeString } from "@/utils/calculateWorkHours";
import { TAttendance } from "../../employee/attendance/Attendance";
import PageHeader from "@/components/shared/PageHeader";

type TTodaysAttendance = TEmployee & { attendanceRecords: TAttendance };

const TodaysAttendance = () => {
  const { data, isLoading } = useGetTodaysAttendanceQuery({});

  return (
    <div className="space-y-6">
      <PageHeader />
      <div className="p-6 border rounded-[16px] grid gap-4">
        <div className="px-6 py-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Todays Attendance</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div className="h-[400px] overflow-y-scroll">
          <Table className="border-b">
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="text-primary">Name</TableHead>
                {/* <TableHead className="text-primary">Check In</TableHead>
                <TableHead className="text-primary font-medium">
                  Check Out
                </TableHead> */}
                <TableHead className="text-primary font-medium">
                  Hours Worked
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Status
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
                  {data?.data?.map(
                    (attendance: TTodaysAttendance, index: number) => {
                      const dailyWorkSessions =
                        attendance?.attendanceRecords?.dailyWorkSessions;
                      return (
                        <TableRow key={index}>
                          <TableCell>{attendance.name}</TableCell>

                          {/* <TableCell>{checkInTime}</TableCell>
                          <TableCell>{checkOutTime}</TableCell> */}
                          <TableCell>
                            {dailyWorkSessions?.length > 0
                              ? totalWorkTimeString(dailyWorkSessions)
                              : "00:00"}
                          </TableCell>
                          <TableCell>
                            <>
                              {!attendance?.attendanceRecords?.checkInDate ? (
                                <span className="px-3 rounded-[12px] py-0.5 bg-[#fd7e1426] text-[#fd7e14] text-sm font-medium flex items-center gap-2 w-fit">
                                  Absent
                                </span>
                              ) : (
                                <span className="px-3 rounded-[12px] py-0.5 bg-[#19875426] text-[#198754] text-sm font-medium flex items-center gap-2 w-fit">
                                  Present
                                </span>
                              )}
                            </>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TodaysAttendance;
