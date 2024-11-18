import httpStatus, { BAD_REQUEST } from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { TAttendance } from './attendance.interface';
import { Attendance } from './attendance.model';
import dayjs from 'dayjs';
import { Employee } from '../employee/employee.model';
import { Types } from 'mongoose';

const checkIn = async (
  payload: { checkInDate: Date; checkInTime: Date },
  employee_id: Types.ObjectId,
) => {
  const startOfDay = dayjs(payload.checkInDate).startOf('day').toDate();
  const endOfDay = dayjs(payload.checkInDate).endOf('day').toDate();

  const existingAttendance = await Attendance.findOne({
    employeeId: employee_id,
    checkInDate: { $gte: startOfDay, $lte: endOfDay },
  });

  let result;

  if (existingAttendance) {
    const activeSession = existingAttendance.dailyWorkSessions.find(
      (dailyWorkSession) => !dailyWorkSession?.checkOutTime,
    );
    if (activeSession) {
      throw new AppError(
        BAD_REQUEST,
        'You are already in a session. Please check out first.',
      );
    }

    result = await Attendance.findOneAndUpdate(
      { _id: existingAttendance._id },
      {
        $addToSet: {
          dailyWorkSessions: { checkInTime: payload.checkInTime },
        },
      },
      {
        new: true,
      },
    );
  } else {
    const data = {
      employeeId: employee_id,
      dailyWorkSessions: [
        {
          checkInTime: payload.checkInTime,
        },
      ],
      checkInDate: payload.checkInDate,
    };

    result = await Attendance.create(data);
  }

  return result;
};

const checkOut = async (_id: string, payload: { checkOutTime: Date }) => {
  const attendance = await Attendance.findOne({ _id });
  if (!attendance) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No attendance record found for today!!',
    );
  }

  const activeSessionIndex = attendance.dailyWorkSessions.find(
    (workSession) => !workSession?.checkOutTime,
  );
  if (!activeSessionIndex) {
    throw new AppError(
      BAD_REQUEST,
      'No active session found to check out. Please check in first.!',
    );
  }

  const dailyWorkSessions = attendance.dailyWorkSessions.map((workSession) => {
    if (!workSession?.checkOutTime) {
      return {
        checkInTime: workSession.checkInTime,
        checkOutTime: payload.checkOutTime,
      };
    } else {
      return workSession;
    }
  });

  const result = await Attendance.findOneAndUpdate(
    { _id },
    { dailyWorkSessions },
    {
      new: true,
    },
  );
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
        dayOffMonth: dayOfMonth,
        checkInDate: formattedDate,
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
          dayOffMonth: dayOfMonth,
          checkInDate: formattedDate,
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

  const result = await Employee.aggregate([
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

  return result;
};

export const AttendanceService = {
  checkIn,
  checkOut,
  checkEmployeeCheckInToday,
  getMonthlyAttendanceSheet,
  getMonthlyAttendanceOfAEmployee,
  getAllAttendance,
  getSingleAttendance,
  updateAttendance,
  todaysAttendance,
};

/**
 * const startBreak = async (_id: string, payload: { startTime: string }) => {
  const attendance = await Attendance.findOne({ _id });
  if (!attendance) {
    throw new AppError(httpStatus.NOT_FOUND, 'Attendance not found!!');
  }

  const isAlreadyInABreak = attendance.breaks.find((brk) => !brk?.endBreak);
  if (isAlreadyInABreak) {
    throw new AppError(BAD_REQUEST, 'You are already in a break');
  }

  const result = await Attendance.findOneAndUpdate(
    { _id },
    {
      $addToSet: {
        breaks: payload,
      },
    },
    {
      new: true,
    },
  );
  return result;
};

const endBreak = async (_id: string, payload: { endBreak: string }) => {
  const attendance = await Attendance.findOne({ _id });
  if (!attendance) {
    throw new AppError(httpStatus.NOT_FOUND, 'Attendance not found!!');
  }

  const isAlreadyInABreak = attendance.breaks.find((brk) => !brk?.endBreak);
  if (!isAlreadyInABreak) {
    throw new AppError(BAD_REQUEST, 'You are not in a break!');
  }

  const breaks = attendance.breaks.map((brk) => {
    if (!brk?.endBreak) {
      return {
        startBreak: brk.startBreak,
        endBreak: payload.endBreak,
      };
    } else {
      return brk;
    }
  });

  const result = await Attendance.findOneAndUpdate(
    { _id },
    { breaks: breaks },
    {
      new: true,
    },
  );
  return result;
};
 */
