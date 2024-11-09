import { adminSidebarItems } from "@/components/layout/dashboardLayout/sidebar/adminSidebarItems";
import { employeeSidebarItems } from "@/components/layout/dashboardLayout/sidebar/employeeSidebarItems";
import { TUserRole } from "@/type/user.tpe";

export const sidebarItemsGenerator = (role: TUserRole | undefined) => {
  if (role === "Admin") {
    return adminSidebarItems;
  } else if (role === "Employee") {
    return employeeSidebarItems;
  } else {
    return [];
  }
};
