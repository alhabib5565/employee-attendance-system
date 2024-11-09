import Loading from "@/components/shared/Loading";
import PageHeader from "@/components/shared/PageHeader";
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
import { useMonthlyAttendanceSheetQuery } from "@/redux/api/attendance.api";
import { TAttendance } from "../../employee/attendance/Attendance";
import { Check, X } from "lucide-react";

type TAttendanceSheet = {
  employeeName: string;
  employeeId: string;
  attendanceRecords: TAttendance[];
};

const MonthlyAttendanceSheet = () => {
  const { data, isLoading } = useMonthlyAttendanceSheetQuery(
    "startDate=2024-11-01&endDate=2024-11-30"
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <PageHeader />
      <div className="p-6 border rounded-[16px] grid gap-4">
        <div className="px-6 py-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Attendance Sheet</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div className="h-[400px] overflow-y-scroll">
          <Table className="border-b">
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="text-primary">Employee Name</TableHead>
                {[...Array(30).keys()].map((day) => (
                  <TableHead key={day}>{day + 1}</TableHead>
                ))}
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
                    (attendance: TAttendanceSheet, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{attendance.employeeName}</TableCell>
                        {attendance?.attendanceRecords.map(
                          (dayOfAttendance: TAttendance, index: number) => (
                            <TableCell key={index}>
                              {dayOfAttendance.isHoliday && (
                                <span className="text-yellow-600">H</span>
                              )}
                              {dayOfAttendance.isAbsent && (
                                <X className="text-red-600 size-5" />
                              )}
                              {!dayOfAttendance.isAbsent &&
                                !dayOfAttendance.isHoliday && (
                                  <Check className="text-green-600 size-5" />
                                )}
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    )
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

export default MonthlyAttendanceSheet;
