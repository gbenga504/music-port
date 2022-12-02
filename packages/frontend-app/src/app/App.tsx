import React, { useEffect, useState } from "react";
import { useLocation, matchRoutes, renderMatches } from "react-router-dom";

import type { RouteObjectWithLoadData, Location } from "react-router-dom";
import type { LoadableComponent } from "@loadable/component";
import type {
  IPageDatas,
  ILoadableComponentProps,
  IMacthedRoutes,
} from "./utils/routeUtils";
import type { createApiClient } from "./api";

import { ErrorBoundary } from "./ErrorBoundary";
import routes from "./routes";
import { loadPageResources } from "./utils/routeUtils";
import { ProgressBar } from "./components/ProgressBar";

interface ITransformMatchedRoutesParams {
  routes: RouteObjectWithLoadData[];
  location: Location;
  pageDatas: IPageDatas;
  api: ReturnType<typeof createApiClient>;
}

const transformMatchedRoutes = ({
  routes,
  location,
  pageDatas,
  api,
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
        element: <Component pageData={pageData} api={api} />,
      },
    };
  });
};

interface IProps {
  pageDatas: IPageDatas;
  error?: Error;
  api: ReturnType<typeof createApiClient>;
}

const App: React.FC<IProps> = ({ pageDatas, error, api }) => {
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [matchedRoutes, setMatchedRoutes] = useState<IMacthedRoutes>([
    ...(transformMatchedRoutes({ routes, location, pageDatas, api }) || []),
  ]);

  useEffect(() => {
    (async function () {
      setIsPageLoading(true);

      const pageDatas = await loadPageResources(
        matchRoutes(routes, location),
        api
      );
      const matchedRoutes = transformMatchedRoutes({
        routes,
        location,
        pageDatas,
        api,
      });

      setIsPageLoading(false);
      setMatchedRoutes(matchedRoutes);
    })();
  }, [location]);

  return (
    <ErrorBoundary error={error}>
      {isPageLoading && <ProgressBar variant="indeterminate" />}
      <div className="bg-page min-h-full h-fit">
        {renderMatches(matchedRoutes)}
      </div>
    </ErrorBoundary>
  );
};

export default App;
