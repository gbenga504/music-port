import React, { useEffect, useState } from "react";
import { useLocation, matchRoutes, renderMatches } from "react-router-dom";

import type { RouteObjectWithLoadData, Location } from "react-router-dom";
import type { LoadableComponent } from "@loadable/component";
import type {
  IPageDatas,
  ILoadableComponentProps,
  IMacthedRoutes,
} from "./utils/routeUtils";

import { ErrorBoundary } from "./ErrorBoundary";
import routes from "./routes";
import { loadPageResources } from "./utils/routeUtils";

interface ITransformMatchedRoutesParams {
  routes: RouteObjectWithLoadData[];
  location: Location;
  pageDatas: IPageDatas;
}

const transformMatchedRoutes = ({
  routes,
  location,
  pageDatas,
}: ITransformMatchedRoutesParams): IMacthedRoutes => {
  const matchedRoutes = matchRoutes(routes, location);

  return matchedRoutes!.map((matchedRoute) => {
    const Component = matchedRoute.route
      .component as LoadableComponent<ILoadableComponentProps>;

    const pageData = pageDatas[matchedRoute.route.id];

    return {
      ...matchedRoute,
      route: {
        ...matchedRoute.route,
        element: <Component pageData={pageData} />,
      },
    };
  });
};

interface IProps {
  pageDatas: IPageDatas;
  error?: Error;
}

const App: React.FC<IProps> = ({ pageDatas, error }) => {
  const location = useLocation();
  const [matchedRoutes, setMatchedRoutes] = useState<IMacthedRoutes>([
    ...(transformMatchedRoutes({ routes, location, pageDatas }) || []),
  ]);

  useEffect(() => {
    (async function () {
      const pageDatas = await loadPageResources(
        matchRoutes(routes, location),
        true
      );
      const matchedRoutes = transformMatchedRoutes({
        routes,
        location,
        pageDatas,
      });

      setMatchedRoutes(matchedRoutes);
    })();
  }, [location]);

  return (
    <ErrorBoundary error={error}>{renderMatches(matchedRoutes)}</ErrorBoundary>
  );
};

export default App;
