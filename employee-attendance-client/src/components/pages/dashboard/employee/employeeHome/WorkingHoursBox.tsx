// /* eslint-disable prefer-const */
// import { calculateWorkHours } from "@/utils/calculateWorkHours";
// import { Clock } from "lucide-react";
// import { TBreak } from "../attendance/type.attendance";

// type TWorkingHourBoxProps = {
//   checkInTime?: string;
//   checkOutTime?: string;
//   breaks: TBreak[] | [];
// };

// const WorkingHoursBox = ({
//   checkInTime,
//   checkOutTime,
//   breaks,
// }: TWorkingHourBoxProps) => {
//   // Output the total working hours and minutes
//   return (
//     <div className="h-[150px] w-[150px] rounded-md bg-[#DEE7FE] p-4 text-black space-y-3 text-left">
//       <Clock className="size-10 " />
//       <h2 className="text-xl font-bold ">
//         {checkInTime && checkOutTime
//           ? calculateWorkHours(checkInTime, checkOutTime, breaks)
//           : "00:00"}
//       </h2>
//       <p>Woking Hour</p>
//     </div>
//   );
// };

// export default WorkingHoursBox;
