import { useAppSelector } from "@/redux/hooks";
import { useCheckEmployeeCheckInTodayQuery } from "@/redux/api/attendance.api";
import CheckInBox from "../pages/dashboard/employee/employeeHome/CheckInBox";
import WorkingHoursBox from "../pages/dashboard/employee/employeeHome/WorkingHoursBox";
import CheckOutBox from "../pages/dashboard/employee/employeeHome/CheckOutBox";

const CheckInCheckOutBox = () => {
  const employeeId = useAppSelector((state) => state.auth.user?.employee_id);

  const { data } = useCheckEmployeeCheckInTodayQuery({
    id: employeeId,
    date: new Date().toUTCString(),
  });

  const checkInTime = data?.data?.checkInTime;
  const checkOutTime = data?.data?.checkOutTime;
  const attendance_id = data?.data?._id;

  return (
    <div className="flex gap-8 justify-center items-center ">
      <CheckInBox employeeId={employeeId || ""} checkInTime={checkInTime} />
      <WorkingHoursBox checkOutTime={checkOutTime} checkInTime={checkInTime} />
      <CheckOutBox
        attendance_id={attendance_id || ""}
        checkOutTime={checkOutTime}
      />
    </div>
  );
};

export default CheckInCheckOutBox;
