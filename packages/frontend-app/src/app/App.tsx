import React, { useEffect, useState } from "react";
import {
  useLocation,
  matchRoutes,
  renderMatches,
  matchPath,
} from "react-router-dom";

import type { RouteObjectWithLoadData, Location } from "react-router-dom";
import type { LoadableComponent } from "@loadable/component";
import type {
  IPageDatas,
  ILoadableComponentProps,
  IMacthedRoutes,
} from "../utils/route-utils";
import type { ICreateApiClient } from "./api";

import routes from "./routes";
import { loadPageResources } from "../utils/route-utils";
import { ProgressBar } from "./components/ProgressBar";
import { ToastProvider } from "./components/Toast/ToastContext";
import { ApiProvider } from "./context/ApiContext";
import "./App.scss";
import useParsedQueryParams from "./hooks/useParsedQueryParams";
import { CookieBanner } from "./components/CookieBanner";

interface ITransformMatchedRoutesParams {
  routes: RouteObjectWithLoadData[];
  location: Location;
  pageDatas: IPageDatas;
  api: ICreateApiClient;
  query: { [key: string]: string };
}

const transformMatchedRoutes = ({
  routes,
  location,
  pageDatas,
  api,
  query,
}: ITransformMatchedRoutesParams): IMacthedRoutes => {
  const matchedRoutes = matchRoutes(routes, location);

  return matchedRoutes!.map((matchedRoute) => {
    const Component = matchedRoute.route
      .component as LoadableComponent<ILoadableComponentProps>;

    const matchedPath = matchPath(
      matchedRoute.route.path!,
      matchedRoute.pathname
    );

    const pageData = pageDatas[matchedRoute.route.id];

    return {
      ...matchedRoute,
      route: {
        ...matchedRoute.route,
        element: (
          <Component
            pageData={pageData}
            api={api}
            query={query}
            params={
              (matchedPath?.params as unknown as { [key: string]: string }) ||
              {}
            }
          />
        ),
      },
    };
  });
};

interface IProps {
  pageDatas: IPageDatas;
  api: ICreateApiClient;
}

const App: React.FC<IProps> = ({ pageDatas, api }) => {
  const location = useLocation();
  const [query] = useParsedQueryParams();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  const transformedMatchedRoutes = [
    ...(transformMatchedRoutes({
      routes,
      location,
      pageDatas,
      api,
      query,
    }) || []),
  ];
  const [matchedRoutes, setMatchedRoutes] = useState<IMacthedRoutes>(
    transformedMatchedRoutes
  );

  useEffect(() => {
    (async function () {
      setIsPageLoading(true);

      const pageDatas = await loadPageResources({
        matchedRoutes: matchRoutes(routes, location),
        api,
        query,
      });
      const matchedRoutes = transformMatchedRoutes({
        routes,
        location,
        pageDatas,
        api,
        query,
      });

      setIsPageLoading(false);
      setMatchedRoutes(matchedRoutes);
    })().catch((error) => setError(error));
  }, [location]);

  useEffect(() => {
    // We need to rethrow any error that occurs during the async
    // process so that it can be caught by the error boundary.
    // Also we throw error because error boundary does not catch errors
    // that occur from async operations hence this hack
    if (error) {
      throw error;
    }
  }, [error]);

  return (
    <>
      {isPageLoading && (
        <div className="fixed w-screen">
          <ProgressBar variant="indeterminate" />
        </div>
      )}
      <ApiProvider api={api}>
        <ToastProvider>
          <div className="bg-secondary400 min-h-full h-fit">
            {renderMatches(matchedRoutes)}
            <CookieBanner />
          </div>
        </ToastProvider>
      </ApiProvider>
    </>
  );
};

export default App;
