import React, { useEffect, useState } from "react";
import { useLocation, matchRoutes, renderMatches } from "react-router-dom";

import type { RouteObjectWithLoadData, Location } from "react-router-dom";
import type { LoadableComponent } from "@loadable/component";
import type {
  IPageDatas,
  ILoadableComponentProps,
  IMacthedRoutes,
} from "../utils/routeUtils";
import type { ICreateApiClient } from "./api";

import { ErrorBoundary } from "./ErrorBoundary";
import routes from "./routes";
import { loadPageResources } from "../utils/routeUtils";
import { ProgressBar } from "./components/ProgressBar";
import { NotFoundError } from "../errors/not-found-error";
import { ToastProvider } from "./components/Toast/ToastContext";
import { ApiProvider } from "./context/ApiContext";

interface ITransformMatchedRoutesParams {
  routes: RouteObjectWithLoadData[];
  location: Location;
  pageDatas: IPageDatas;
  api: ICreateApiClient;
}

const transformMatchedRoutes = ({
  routes,
  location,
  pageDatas,
  api,
}: ITransformMatchedRoutesParams): IMacthedRoutes => {
  const matchedRoutes = matchRoutes(routes, location);

  if (!matchedRoutes) {
    throw new NotFoundError();
  }

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
  api: ICreateApiClient;
}

const App: React.FC<IProps> = ({ pageDatas, error, api }) => {
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const transformedMatchedRoutes = error
    ? []
    : [...(transformMatchedRoutes({ routes, location, pageDatas, api }) || [])];
  const [matchedRoutes, setMatchedRoutes] = useState<IMacthedRoutes>(
    transformedMatchedRoutes
  );

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
      {isPageLoading && (
        <div className="absolute w-screen">
          <ProgressBar variant="indeterminate" />
        </div>
      )}
      <ApiProvider api={api}>
        <ToastProvider>
          <div className="bg-page min-h-full h-fit">
            {renderMatches(matchedRoutes)}
          </div>
        </ToastProvider>
      </ApiProvider>
    </ErrorBoundary>
  );
};

export default App;
