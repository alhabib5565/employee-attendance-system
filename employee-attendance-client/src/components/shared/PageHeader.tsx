import { Calendar, ChevronRight, CornerUpLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useLocation } from "react-router-dom";
type TPageHeaderProps = {
  pageTitle?: string;
};
const PageHeader = ({ pageTitle }: TPageHeaderProps) => {
  const { pathname } = useLocation();
  const splitedPathname = pathname.split("/");
  const pageName = splitedPathname[splitedPathname.length - 1];
  const breadcrumbItems = splitedPathname.filter((item) => item);

  return (
    <div className="flex justify-between items-center ">
      {pageTitle ? (
        <h2 className="text-[#343a40] text-2xl font-semibold font-roboto leading-9 capitalize">
          {pageTitle}
        </h2>
      ) : (
        <div>
          <h2 className="text-[#343a40] text-2xl font-semibold font-roboto leading-9 capitalize">
            {pathname === "/" ? "Dashboard" : pageName.split("-").join(" ")}
          </h2>
          <div className="flex gap-2 items-center text-sm font-normal">
            {pathname === "/" ? (
              <span className="flex items-center">
                <span className="capitalize">Dashboard</span>

                <ChevronRight size={14} className="ml-2" />
                <span>Home</span>
              </span>
            ) : (
              <>
                {breadcrumbItems.map((item, index) => (
                  <span key={index} className="flex items-center">
                    <span className="capitalize">{item.replace("-", " ")}</span>
                    {index !== breadcrumbItems.length - 1 && (
                      <ChevronRight size={14} className="ml-2" />
                    )}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <p className="text-center text-[#495057] text-sm font-normal leading-[21px] tracking-tight flex items-center gap-1">
          10 Sep 2022 - 11 Oct 2022 <Calendar size={14} />
        </p>
        <Button className="size-11 p-0">
          <CornerUpLeft className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
