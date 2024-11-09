import { TUserPath } from "@/type/paths.type";
import { Edit, LayoutDashboard } from "lucide-react";

export const employeeSidebarItems: TUserPath[] = [
  {
    label: "Dashboard",
    href: "/dashboard/employee",
    icon: LayoutDashboard,
  },

  {
    label: "Attendance",
    href: "attendance",
    icon: Edit,
  },
];
