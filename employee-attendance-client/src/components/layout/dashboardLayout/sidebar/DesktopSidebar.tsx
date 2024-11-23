import { Link } from "react-router-dom";
import SidebarDropdownItem from "./SidebarDropdownItem";
import SingleSidebarItem from "./SingleSidebarItem";
import logo from "../../../../assets/logo/logo.png";
import { sidebarItemsGenerator } from "@/utils/sidebarItemsGenerator";
import { useAppSelector } from "@/redux/hooks";

const DesktopSidebar = () => {
  const role = useAppSelector((state) => state.auth.user?.role);
  return (
    <div className=" w-[300px] fixed top-0 left-0 min-h-screen h-full overflow-y-scroll p-6">
      <Link to={"#"}>
        <img alt="logo" src={logo} className="mx-auto mb-2 w-[115.83px] h-12" />
      </Link>
      <hr className=" mb-6" />

      <div className="space-y-6">
        {sidebarItemsGenerator(role)?.map((item, index) => {
          return item.children && item.children.length > 0 ? (
            <SidebarDropdownItem item={item} key={index} />
          ) : (
            <SingleSidebarItem key={index} item={item} />
          );
        })}
      </div>
    </div>
  );
};

export default DesktopSidebar;
