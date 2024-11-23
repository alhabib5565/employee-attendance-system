import { useAppSelector } from "@/redux/hooks";
import { useCheckEmployeeCheckInTodayQuery } from "@/redux/api/attendance.api";
import CheckInBox from "./CheckInBox";
import CheckOutBox from "./CheckOutBox";
import { checkActiveSession } from "./checkInCheckOut.utils";

const CheckInCheckOutBox = () => {
  const employeeId = useAppSelector((state) => state.auth.user?.employee_id);

  const { data } = useCheckEmployeeCheckInTodayQuery({
    id: employeeId,
    date: new Date().toISOString().slice(0, 10),
  });

  const dailyWorkSessions = data?.data?.dailyWorkSessions;
  const attendance_id = data?.data?._id;

  const activeSession = checkActiveSession(dailyWorkSessions);

  return (
    <div className="flex flex-wrap gap-8 justify-center items-center ">
      {activeSession ? (
        <CheckOutBox
          attendance_id={attendance_id || ""}
          dailyWorkSessions={dailyWorkSessions}
        />
      ) : (
        <CheckInBox
          employeeId={employeeId || ""}
          dailyWorkSessions={dailyWorkSessions}
        />
      )}
    </div>
  );
};

export default CheckInCheckOutBox;
