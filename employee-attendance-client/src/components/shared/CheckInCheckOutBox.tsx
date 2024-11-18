import { useAppSelector } from "@/redux/hooks";
import { useCheckEmployeeCheckInTodayQuery } from "@/redux/api/attendance.api";
import CheckInBox from "../pages/dashboard/employee/employeeHome/CheckInBox";
import WorkingHoursBox from "../pages/dashboard/employee/employeeHome/WorkingHoursBox";
import CheckOutBox from "../pages/dashboard/employee/employeeHome/CheckOutBox";
import BreakBox from "../pages/dashboard/employee/employeeHome/BreakBox";

const CheckInCheckOutBox = () => {
  const employeeId = useAppSelector((state) => state.auth.user?.employee_id);

  const { data } = useCheckEmployeeCheckInTodayQuery({
    id: employeeId,
    date: new Date().toUTCString(),
  });

  const checkInTime = data?.data?.checkInTime;
  const checkOutTime = data?.data?.checkOutTime;
  const breaks = data?.data?.breaks;
  const attendance_id = data?.data?._id;

  console.log(data?.data);

  return (
    <div className="flex flex-wrap gap-8 justify-center items-center ">
      <CheckInBox employeeId={employeeId || ""} checkInTime={checkInTime} />
      <WorkingHoursBox
        breaks={breaks}
        checkOutTime={checkOutTime}
        checkInTime={checkInTime}
      />
      <BreakBox
        attendance_id={attendance_id || ""}
        todayAttendance={data?.data}
      />
      <CheckOutBox
        attendance_id={attendance_id || ""}
        checkOutTime={checkOutTime}
        checkInTime={checkInTime}
      />
    </div>
  );
};

export default CheckInCheckOutBox;
