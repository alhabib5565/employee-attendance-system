import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/components/layout/dashboardLayout/DashboardLayout";
import Login from "@/components/pages/auth/Login";
import Register from "@/components/pages/auth/Register";
import CreateUser from "@/components/pages/dashboard/admin/CreateUser";
import EditUser from "@/components/pages/dashboard/admin/EditUser";
import AllUsers from "@/components/pages/dashboard/admin/AllUsers";
import App from "@/App";
import ProtectedRoute from "@/components/layout/dashboardLayout/ProtectedRoute";
import EmployeeHome from "@/components/pages/dashboard/employee/employeeHome/EmployeeHome";
import Attendance from "@/components/pages/dashboard/employee/attendance/Attendance";
import MonthlyAttendanceSheet from "@/components/pages/dashboard/admin/attendance/MonthlyAttendanceSheet";
import AdminHome from "@/components/pages/dashboard/admin/adminHome/AdminHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard/admin",
    element: (
      <ProtectedRoute role="Admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "user-management/create-employee",
        element: <CreateUser />,
      },
      {
        path: "user-management/all-employees",
        element: <AllUsers />,
      },
      {
        path: "user-management/edit-user/:id",
        element: <EditUser />,
      },
      {
        path: "attendance-management/todays-attendance",
        element: <h2>todays attendance</h2>,
      },
      {
        path: "attendance-management/attendance-sheet",
        element: <MonthlyAttendanceSheet />,
      },
    ],
  },
  {
    path: "/dashboard/employee",
    element: (
      <ProtectedRoute role="Employee">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <EmployeeHome />,
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
