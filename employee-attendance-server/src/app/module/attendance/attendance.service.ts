import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { TAttendance } from './attendance.interface';
import { Attendance } from './attendance.model';
import dayjs from 'dayjs';
import { Employee } from '../employee/employee.model';

const createAttendance = async (payload: TAttendance) => {
  const startOfDay = dayjs(payload.checkInDate).startOf('day').toDate();
  const endOfDay = dayjs(payload.checkInDate).endOf('day').toDate();
  const isAlreadyCheckIn = await Attendance.findOne({
    employeeId: payload.employeeId,
    checkInDate: { $gte: startOfDay, $lte: endOfDay },
  });

  if (isAlreadyCheckIn) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You are already checked in today',
    );
  }

  const result = await Attendance.create(payload);
  return result;
};

const checkEmployeeCheckInToday = async (
  checkInDate: string,
  employeeId: string,
) => {
  const startOfDay = dayjs(checkInDate).startOf('day').toDate();
  const endOfDay = dayjs(checkInDate).endOf('day').toDate();
  const result = await Attendance.findOne({
    employeeId,
    checkInDate: { $gte: startOfDay, $lte: endOfDay },
  });
  return result;
};

const getAllAttendance = async (query: Record<string, unknown>) => {
  const searchAbleFields = ['name', 'email'];
  const employeeQuery = new QueryBuilder(query, Attendance.find())
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await employeeQuery.countTotal();
  const result = await employeeQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleAttendance = async (_id: string) => {
  const result = await Attendance.findOne({ _id });
  return result;
};

const updateAttendance = async (_id: string, payload: Partial<TAttendance>) => {
  const attendance = await Attendance.findOne({ _id });
  if (!attendance) {
    throw new AppError(httpStatus.NOT_FOUND, 'Attendance not found!!');
  }

  const result = await Attendance.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

const getMonthlyAttendanceOfAEmployee = async (
  date: string,
  employeeId: string,
) => {
  const startOfMonth = dayjs(date).startOf('month').toDate();
  const endOfMonth = dayjs(date).endOf('month').toDate();

  const monthlyAttendanceRecords = await Attendance.find({
    employeeId,
    checkInDate: { $gte: startOfMonth, $lte: endOfMonth },
  });

  const today = new Date();
  const currentDay = today.getDate();

  const attendanceData = [];

  for (let i = 0; i < currentDay; i++) {
    const attendanceDate = new Date(today);
    attendanceDate.setHours(0, 0, 0, 0);
    attendanceDate.setDate(today.getDate() - i);

    const formattedDate = dayjs(attendanceDate).format('YYYY-MM-DD');
    const dayOfMonth = attendanceDate.getDate(); // Get the day of the month
    const isFriday = attendanceDate.getDay() === 5;

    if (isFriday) {
      attendanceData.unshift({
        isHoliday: true,
        dayOffMonth: dayOfMonth, // Set dayOfMonth to actual day
      });
    } else {
      const attendanceOfADay = monthlyAttendanceRecords.find((data) => {
        return dayjs(data.checkInDate).format('YYYY-MM-DD') === formattedDate;
      });
      if (attendanceOfADay) {
        attendanceData.unshift({
          ...attendanceOfADay.toObject(),
          dayOffMonth: dayOfMonth, // Set dayOfMonth to actual day
          isHoliday: isFriday,
        });
      } else {
        attendanceData.unshift({
          isHoliday: isFriday,
          isAbsent: true,
          dayOffMonth: dayOfMonth, // Set dayOfMonth to actual day
        });
      }
    }
  }
  return attendanceData;
};

const getMonthlyAttendanceSheet = async (
  startDate: string,
  endDate: string,
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const attendanceSheetData = await Attendance.aggregate([
    {
      $match: {
        checkInDate: { $gte: start, $lte: end },
      },
    },

    {
      $lookup: {
        as: 'employeeInfo',
        from: 'employees',
        foreignField: '_id',
        localField: 'employeeId',
      },
    },

    {
      $unwind: '$employeeInfo',
    },

    {
      $group: {
        _id: '$employeeId',
        employeeName: { $first: '$employeeInfo.name' },
        attendanceRecords: {
          $push: {
            date: '$checkInDate',
            checkInTime: '$checkInTime',
            checkOutTime: '$checkOutTime',
            isAbsent: '$isAbsent',
            leaveType: '$leaveType',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        employeeId: '$_id',
        employeeName: 1,
        attendanceRecords: 1,
      },
    },
    // {
    //   $unwind: {}
    // }
  ]);

  const today = new Date();
  const currentDay = today.getDate();

  const allEmployeeAttendance = [];

  for (let j = 0; j < attendanceSheetData.length; j++) {
    const attendanceOfOneEmployee = attendanceSheetData[j];
    const attendanceRecords = attendanceOfOneEmployee.attendanceRecords; // ekjon employee er attendance
    const attendanceData = [];

    for (let i = 0; i < currentDay; i++) {
      const attendanceDate = new Date(today);
      attendanceDate.setHours(0, 0, 0, 0);
      attendanceDate.setDate(today.getDate() - i);

      const formattedDate = dayjs(attendanceDate).format('YYYY-MM-DD');
      const dayOfMonth = attendanceDate.getDate(); // Get the day of the month
      const isFriday = attendanceDate.getDay() === 5;

      if (isFriday) {
        attendanceData.unshift({
          isHoliday: true,
          dayOffMonth: dayOfMonth, // Set dayOfMonth to actual day
        });
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const attendanceOfADay = attendanceRecords.find((data: any) => {
          return dayjs(data.date).format('YYYY-MM-DD') === formattedDate;
        });
        if (attendanceOfADay) {
          attendanceData.unshift({
            ...attendanceOfADay,
            dayOffMonth: dayOfMonth, // Set dayOfMonth to actual day
            isHoliday: isFriday,
          });
        } else {
          attendanceData.unshift({
            isHoliday: isFriday,
            isAbsent: true,
            dayOffMonth: dayOfMonth, // Set dayOfMonth to actual day
          });
        }
      }
    }

    allEmployeeAttendance.push({
      employeeId: attendanceOfOneEmployee.employeeId,
      employeeName: attendanceOfOneEmployee.employeeName,
      attendanceRecords: attendanceData,
    });
  }

  return allEmployeeAttendance;
};

const todaysAttendance = async () => {
  const today = new Date();
  const startOfToday = dayjs(today).startOf('day').toDate();
  const endOfToday = dayjs(today).endOf('day').toDate();

  const a = await Employee.aggregate([
    {
      $lookup: {
        as: 'attendanceRecords',
        from: 'attendances',
        foreignField: 'employeeId',
        localField: '_id',
      },
    },
    {
      $unwind: {
        path: '$attendanceRecords',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        $or: [
          {
            attendanceRecords: { $exists: false },
          },
          {
            'attendanceRecords.checkInDate': {
              $gte: startOfToday,
              $lte: endOfToday,
            },
          },
        ],
      },
    },
  ]);

  return a;
};

export const AttendanceService = {
  checkEmployeeCheckInToday,
  getMonthlyAttendanceSheet,
  getMonthlyAttendanceOfAEmployee,
  createAttendance,
  getAllAttendance,
  getSingleAttendance,
  updateAttendance,
  todaysAttendance,
};
