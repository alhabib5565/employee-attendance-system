import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AttendanceService } from './attendance.service';

const checkIn = catchAsync(async (req: Request, res: Response) => {
  const result = await AttendanceService.checkIn(
    req.body,
    req.employee.employee_id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Attendance created successfully.',
    data: result,
  });
});

const getAllAttendance = catchAsync(async (req: Request, res: Response) => {
  const { result, meta } = await AttendanceService.getAllAttendance(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Attendances retrieved successfully.',
    meta,
    data: result,
  });
});

const checkEmployeeCheckInToday = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AttendanceService.checkEmployeeCheckInToday(
      req.params.date,
      req.params.id,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Check employee checked in today retrieved successfully.',
      data: result,
    });
  },
);

const getMonthlyAttendanceSheet = catchAsync(
  async (req: Request, res: Response) => {
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;

    const result = await AttendanceService.getMonthlyAttendanceSheet(
      startDate,
      endDate,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Get monthly attendance sheet successfully.',
      data: result,
    });
  },
);

const getMonthlyAttendanceOfAEmployee = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AttendanceService.getMonthlyAttendanceOfAEmployee(
      req.params.date,
      req.params.id,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Get monthly attendance of a employee successfully.',
      data: result,
    });
  },
);

const todaysAttendance = catchAsync(async (req: Request, res: Response) => {
  const result = await AttendanceService.todaysAttendance();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Get today"s attendance successfully.',
    data: result,
  });
});

const getSingleAttendance = catchAsync(async (req: Request, res: Response) => {
  const result = await AttendanceService.getSingleAttendance(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: `Attendance with ID ${req.params.id} updated successfully.`,
    data: result,
  });
});

const updateAttendance = catchAsync(async (req: Request, res: Response) => {
  const result = await AttendanceService.updateAttendance(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: '',
    data: result,
  });
});

const checkOut = catchAsync(async (req: Request, res: Response) => {
  const result = await AttendanceService.checkOut(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Check out successfully',
    data: result,
  });
});

export const AttendanceController = {
  checkIn,
  getAllAttendance,
  getSingleAttendance,
  updateAttendance,
  checkEmployeeCheckInToday,
  getMonthlyAttendanceOfAEmployee,
  getMonthlyAttendanceSheet,
  todaysAttendance,
  checkOut,
};
