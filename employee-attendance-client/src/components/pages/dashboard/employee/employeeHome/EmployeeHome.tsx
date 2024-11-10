import Attendance from "../attendance/Attendance";
import CheckInCheckOutBox from "@/components/shared/CheckInCheckOutBox";

const EmployeeHome = () => {
  return (
    <div className="space-y-6">
      <CheckInCheckOutBox />
      <Attendance />
    </div>
  );
};

export default EmployeeHome;
