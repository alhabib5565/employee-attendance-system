import CheckInCheckOutBox from "@/components/shared/checkInCheckOut/CheckInCheckOutBox";
import TodaysAttendance from "./TodaysAttendance";

const AdminHome = () => {
  return (
    <div className="space-y-6">
      <CheckInCheckOutBox />
      <TodaysAttendance />
    </div>
  );
};

export default AdminHome;
