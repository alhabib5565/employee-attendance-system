import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import DashboardNav from "./sidebar/DashboardNav";

const DashboardLayout = () => {
  return (
    <div>
      <Sidebar />
      <div className="lg:ml-[300px]">
        <DashboardNav />
        <div className="p-4 min-h-[calc(100vh-68px)] bg-[#F8F9FA]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
