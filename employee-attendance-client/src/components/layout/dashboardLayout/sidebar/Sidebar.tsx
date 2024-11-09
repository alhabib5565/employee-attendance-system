import MobileSidebar from "./MobileSidebar";
import DesktopSidebar from "./DesktopSidebar";

const Sidebar = () => {
  return (
    <div>
      <div className="lg:hidden">
        <MobileSidebar />
      </div>
      <div className="hidden lg:flex">
        <DesktopSidebar />
      </div>
    </div>
  );
};

export default Sidebar;
