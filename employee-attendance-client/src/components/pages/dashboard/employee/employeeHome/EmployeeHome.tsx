import { useAppSelector } from "@/redux/hooks";
import CheckInBox from "./CheckInBox";
import CheckOutBox from "./CheckOutBox";
import { useCheckEmployeeCheckInTodayQuery } from "@/redux/api/attendance.api";
import WorkingHoursBox from "./WorkingHoursBox";
import Attendance from "../attendance/Attendance";

const EmployeeHome = () => {
  const employeeId = useAppSelector((state) => state.auth.user?.employee_id);

  const { data } = useCheckEmployeeCheckInTodayQuery({
    id: employeeId,
    date: new Date().toUTCString(),
  });

  const checkInTime = data?.data?.checkInTime;
  const checkOutTime = data?.data?.checkOutTime;
  const attendance_id = data?.data?._id;

  return (
    <div className="space-y-6">
      <div className="flex gap-8 justify-center items-center ">
        <CheckInBox employeeId={employeeId || ""} checkInTime={checkInTime} />
        <WorkingHoursBox
          checkOutTime={checkOutTime}
          checkInTime={checkInTime}
        />
        <CheckOutBox
          attendance_id={attendance_id || ""}
          checkOutTime={checkOutTime}
        />
      </div>
      <Attendance />
    </div>
  );
};

export default EmployeeHome;
