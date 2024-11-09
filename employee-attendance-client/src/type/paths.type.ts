import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

export type TUserPath = {
  label: string;
  href?: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  element?: ReactNode;
  children?: TUserPath[];
};

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TSidebarItem =
  | {
      href: string;
      label: string;
      icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
      children?: TSidebarItem[];
    }
  | undefined;
