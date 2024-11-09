import { store } from "@/redux/store";
import { TUserPath } from "@/type/paths.type";
import { Edit, LayoutDashboard, User, UserCog } from "lucide-react";

const state = store.getState();

const role = state.auth.user?.role;

let url = "";
if (role === "Admin") {
  url = `/dashboard/admin`;
} else if (role === "Employee") {
  url = "/dashboard/admin";
}
export const adminSidebarItems: TUserPath[] = [
  {
    label: "Dashboard",
    href: url,
    icon: LayoutDashboard,
  },
  {
    label: "Employee",
    icon: UserCog,
    children: [
      {
        label: "Create Employee",
        href: "user-management/create-employee",
        icon: User,
      },

      {
        label: "All Employee",
        href: "user-management/all-employees",
        icon: User,
      },
    ],
  },
  {
    label: "Attendance",
    icon: Edit,
    children: [
      {
        label: "Today's Attendance",
        href: "attendance-management/todays-attendance",
        icon: User,
      },

      {
        label: "Attendance Sheet",
        href: "attendance-management/attendance-sheet",
        icon: User,
      },
    ],
  },
  {
    label: "leave Management",
    icon: Edit,
    children: [
      {
        label: "All Leave Requests",
        href: "leave-management/all-leave-requests",
        icon: User,
      },
    ],
  },
];
