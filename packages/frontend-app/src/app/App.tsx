import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import React from "react";
import {
  useLocation,
  matchRoutes,
  renderMatches,
  matchPath,
  useNavigate,
} from "react-router-dom";

import { CookieBanner } from "./components/CookieBanner";
import { CreatePlaylistModal } from "./components/CreatePlaylistModal/CreatePlaylistModal";
import { ReviewPlaylistModal } from "./components/CreatePlaylistModal/ReviewPlaylistModal";
import { PageLoadingProgressBar } from "./components/PageLoadingProgressBar/PageLoadingProgressBar";
import { PlayerProvider } from "./components/Player/PlayerContext";
import { ToastProvider } from "./components/Toast/ToastContext";
import { ApiProvider } from "./context/ApiContext";
import { GlobalPageDataProvider } from "./context/GlobalPageDataContext";
import useParsedQueryParams from "./hooks/useParsedQueryParams";
import routes from "./routes";

import { globals } from "../utils/globals";
import { loadPageResources } from "../utils/route-utils";

import type { ICreateApiClient } from "./api";
import type {
  IPageDatas,
  ILoadableComponentProps,
  IMacthedRoutes,
  IGlobalPageData,
} from "../utils/route-utils";
import type { LoadableComponent } from "@loadable/component";
import type { RouteObjectWithLoadData, Location } from "react-router-dom";

import "./App.scss";

interface ITransformMatchedRoutesParams {
  routes: RouteObjectWithLoadData[];
  location: Location;
  pageDatas: IPageDatas;
  globalPageData: IGlobalPageData;
  api: ICreateApiClient;
  query: { [key: string]: string };
}

dayjs.extend(utc);
dayjs.extend(relativeTime);

const transformMatchedRoutes = ({
  routes,
  location,
  pageDatas,
  globalPageData,
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
            globalPageData={globalPageData}
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
  globalPageData: IGlobalPageData;
  api: ICreateApiClient;
  origin: string;
}

const App: React.FC<IProps> = ({ pageDatas, globalPageData, api, origin }) => {
  const location = useLocation();
  const [query] = useParsedQueryParams();
  const navigate = useNavigate();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  if (origin) {
    globals.setSiteOrigin(origin);
  }

  const transformedMatchedRoutes = [
    ...(transformMatchedRoutes({
      routes,
      location,
      pageDatas,
      globalPageData,
      api,
      query,
    }) || []),
  ];
  const [matchedRoutes, setMatchedRoutes] = useState<IMacthedRoutes>(
    () => transformedMatchedRoutes
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
        globalPageData,
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

  const renderModals = () => {
    return (
      <React.Fragment>
        <CreatePlaylistModal
          open={query["createPlaylist"] === "true"}
          onClose={() => navigate(location.pathname)}
        />
        <ReviewPlaylistModal open={query["reviewPlaylist"] === "true"} />
      </React.Fragment>
    );
  };

  return (
    <>
      {isPageLoading && (
        <div className="fixed w-screen">
          <PageLoadingProgressBar variant="indeterminate" />
        </div>
      )}
      <ApiProvider api={api}>
        <GlobalPageDataProvider globalPageData={globalPageData}>
          <ToastProvider>
            <PlayerProvider>
              <div className="bg-secondary400 min-h-full h-fit">
                {renderMatches(matchedRoutes)}
                <CookieBanner />
                {renderModals()}
              </div>
            </PlayerProvider>
          </ToastProvider>
        </GlobalPageDataProvider>
      </ApiProvider>
    </>
  );
};

export default App;
