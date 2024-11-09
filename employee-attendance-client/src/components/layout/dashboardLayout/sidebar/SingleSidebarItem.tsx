import { cn } from "@/lib/utils";
import { TUserPath } from "@/type/paths.type";
import { ChevronRight, Dot } from "lucide-react";
import { NavLink } from "react-router-dom";

type SidebarItemProps = {
  item: TUserPath;
  isDropdownItem?: boolean;
};

const SingleSidebarItem = ({ item, isDropdownItem }: SidebarItemProps) => {
  if (!item.icon) return;
  return (
    <NavLink
      to={`${item?.href}`}
      className={({ isActive }) =>
        cn(
          "w-full hover:bg-secondary flex gap-2 items-center justify-between rounded-[8px] p-4 text-[16px] leading-[22.4px] tracking-[0.2px] text-light-subtext",
          { "bg-secondary text-primary": isActive },
          { "pl-6": isDropdownItem }
        )
      }
    >
      <div className="flex gap-4 items-center">
        {isDropdownItem ? (
          <Dot />
        ) : (
          <item.icon className="size-6 text-primary" />
        )}
        <span className="text-light-subtext"> {item?.label}</span>
      </div>
      <ChevronRight className="text-light-subtext size-5" />
    </NavLink>
  );
};

export default SingleSidebarItem;
