import { TRoute, TUserPath } from "@/type/paths.type";

export const routeGenerator = (items: TUserPath[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item.href && item.element) {
      acc.push({
        path: item.href,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.href!,
          element: child.element,
        });
      });
    }

    return acc;
  }, []);

  return routes;
};
