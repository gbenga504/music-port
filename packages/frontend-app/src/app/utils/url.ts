import type { RouteObjectWithLoadData } from "react-router-dom";

import routes from "../routes";

export const constructURL = ({ routeId }: { routeId: string }): string => {
  const path = getPath({ routes, routeId });

  if (path) {
    return path;
  }

  // TODO: throw a proper error
  throw new Error("Cannot find path");
};

const getPath = ({
  routes,
  routeId,
}: {
  routes: RouteObjectWithLoadData[];
  routeId: string;
}): string | undefined => {
  if (routes.length === 0) return undefined;

  const [firstRoute, ...restRoutes] = routes;

  if (firstRoute.id === routeId) {
    return firstRoute.path;
  } else if (firstRoute.children) {
    const path = getPath({ routes: firstRoute.children, routeId });

    if (path) return path;
  }

  return getPath({ routes: restRoutes, routeId });
};
