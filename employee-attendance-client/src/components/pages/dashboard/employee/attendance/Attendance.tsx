import { useMonthlyAttendanceOfAEmployeeQuery } from "@/redux/api/attendance.api";
import { useAppSelector } from "@/redux/hooks";
import { totalWorkTimeString } from "@/utils/calculateWorkHours";
import { TDailyWorkSessions } from "./type.attendance";
import ProgressBar from "./ProgressBar";
import Loading from "@/components/shared/Loading";

export type TAttendance = {
  isHoliday?: boolean;
  dayOffMonth?: number;
  isAbsent?: boolean;
  checkInDate?: string;
  dailyWorkSessions: TDailyWorkSessions[];
};

const Attendance = () => {
  const employeeId = useAppSelector((state) => state.auth.user?.employee_id);

  const { data, isLoading } = useMonthlyAttendanceOfAEmployeeQuery({
    id: employeeId,
    date: new Date().toISOString().slice(0, 10),
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="space-y-6">
      {data?.data?.slice(-7).map((attendance: TAttendance, index: number) => {
        const formatedCheckInDate = new Date(
          attendance?.checkInDate || ""
        ).toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
        });

        const dailyWorkSessions = attendance?.dailyWorkSessions;
        const dailyWorkSessionsLength = dailyWorkSessions?.length;
        return (
          <div className="flex gap-4" key={index}>
            <div className="flex flex-col gap-2 w-14 text-end ">
              <span className=" font-bold text-xl">
                {formatedCheckInDate.split(" ")[1]}
              </span>
              <span className="">{formatedCheckInDate.split(" ")[0]}</span>
            </div>

            <div className="bg-white px-5 py-3 rounded-md w-full flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
              {dailyWorkSessionsLength > 0 && (
                <div>
                  <span>1st Check-in</span>
                  <h3 className=" font-bold text-xl">
                    {new Date(
                      dailyWorkSessions[0]?.checkInTime || ""
                    ).toLocaleString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </h3>
                </div>
              )}

              <div className="grow">
                {attendance?.isHoliday === true ? (
                  <HolydayDividerWithLable />
                ) : attendance.isAbsent === true ? (
                  <AbsentDividerWithLable />
                ) : dailyWorkSessionsLength > 0 ? (
                  <ProgressBar dailyWorkSessions={dailyWorkSessions} />
                ) : (
                  "Unknown Status"
                )}
              </div>

              {dailyWorkSessionsLength > 0 && (
                <>
                  {dailyWorkSessions[dailyWorkSessionsLength - 1]
                    ?.checkOutTime ? (
                    <div>
                      <span>Last Check-Out</span>
                      <h3 className=" font-bold text-xl">
                        {new Date(
                          dailyWorkSessions[dailyWorkSessionsLength - 1]
                            ?.checkOutTime || ""
                        ).toLocaleString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </h3>
                    </div>
                  ) : (
                    <p>Incomplete</p>
                  )}
                </>
              )}

              {dailyWorkSessionsLength > 0
                ? totalWorkTimeString(dailyWorkSessions)
                : "00:00"}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Attendance;

const AbsentDividerWithLable = () => {
  return (
    <div className="relative flex items-center">
      <div className="flex-grow border-t-4 border-[#fd7e1426]"></div>
      <span className="px-3 rounded-[12px] py-0.5 bg-[#fd7e1426] text-[#fd7e14] text-sm font-medium flex items-center gap-2 w-fit">
        Absent
      </span>
      <div className="flex-grow border-t-4 border-[#fd7e1426]"></div>
    </div>
  );
};
const HolydayDividerWithLable = () => {
  return (
    <div className="relative flex items-center">
      <div className="flex-grow border-t-4 border-red-200"></div>
      <span className="px-3 rounded-[12px] py-0.5 bg-red-600 bg-opacity-15 text-red-600 text-sm font-medium flex items-center gap-2 w-fit">
        Holyday
      </span>
      <div className="flex-grow border-t-4 border-red-200"></div>
    </div>
  );
};

/**
 *    <div className="p-6 border rounded-[16px] grid gap-4">
        <div className="px-6 py-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Attendance</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div className="h-[400px] overflow-y-scroll relative">
          <Table className="border-b ">
            <TableHeader className={cn(" bg-secondary")}>
              <TableRow>
                <TableHead className="text-primary">Date</TableHead>
                <TableHead className="text-primary">Check In</TableHead>
                {/* <TableHead className="text-primary font-medium">
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
                  {data?.data
                    ?.slice(-7)
                    .map((attendance: TAttendance, index: number) => (
                      <TableRow key={index}>
                        <TableCell>
                          {attendance?.checkInDate?.slice(0, 10)}
                        </TableCell>
                        <TableCell className="w-[300px]">
                          {attendance?.dailyWorkSessions?.length > 0 ? (
                            <ProgressBar
                              dailyWorkSessions={attendance.dailyWorkSessions}
                            />
                          ) : (
                            "absent"
                          )}
                        </TableCell>
                       
                      <TableCell>{attendance?.checkOutTime}</TableCell> 
                        <TableCell>
                          {attendance?.dailyWorkSessions?.length > 0
                            ? totalWorkTimeString(attendance.dailyWorkSessions)
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
 */
