import { TUserPath } from "@/type/paths.type";
import { Edit, HandHelping, LayoutDashboard, Workflow } from "lucide-react";

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

  {
    label: "Leave",
    icon: HandHelping,
    children: [
      {
        label: "Request For Leave",
        href: "leave-request",
        icon: HandHelping,
      },

      {
        label: "All Leave Request",
        href: "all-leave-request",
        icon: HandHelping,
      },
    ],
  },
  {
    label: "Task",
    icon: Workflow,
    children: [
      {
        label: "Create Task",
        href: "create-task",
        icon: Workflow,
      },

      {
        label: "All Task",
        href: "all-task",
        icon: Workflow,
      },
    ],
  },
];
