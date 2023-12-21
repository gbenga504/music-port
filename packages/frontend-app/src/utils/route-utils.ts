import { matchPath } from "react-router-dom";

import routes from "../app/routes";
import { NotFoundError } from "../errors/not-found-error";

import type { ICreateApiClient } from "../app/api";
import type { RouteObjectWithLoadData, matchRoutes } from "react-router-dom";

export interface IPageDatas {
  [key: string]: any;
}

export interface ILoadableComponentProps<
  PageData = unknown,
  Query = unknown,
  Params = { [key: string]: string },
> {
  pageData: PageData;
  api: ICreateApiClient;
  query: Query;
  params: Params;
}

export interface ILoadData<
  Query = unknown,
  Params = { [key: string]: string },
> {
  api: ICreateApiClient;
  params: Params;
  query: Query;
}

export type IMacthedRoutes = ReturnType<
  typeof matchRoutes<RouteObjectWithLoadData>
>;

interface ILoadPageDataPromise {
  id: string;
  data: object | null;
}

interface ILoadPageResourcesOptions {
  matchedRoutes: IMacthedRoutes;
  api: ICreateApiClient;
  query: { [key: string]: string };
}

export const loadPageResources = async ({
  matchedRoutes,
  api,
  query,
}: ILoadPageResourcesOptions): Promise<IPageDatas> => {
  // TODO: Maybe this should not be here since we want this function
  // to load only page resources
  if (!matchedRoutes) {
    throw new NotFoundError();
  }

  const matchedRoutesPromises = matchedRoutes.map((matchedRoute) => {
    let params = {};
    const matchedPath = matchPath(
      matchedRoute.route.path!,
      matchedRoute.pathname,
    );

    if (matchedPath) {
      params = matchedPath.params;
    }

    if (matchedRoute.route.loadData) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise<ILoadPageDataPromise>(async (resolve, reject) => {
        try {
          let data = {};

          await matchedRoute.route.component.load();

          if (matchedRoute.route.loadData) {
            data = await matchedRoute.route.loadData({
              api,
              params: params as { [key: string]: string },
              query,
            });
          }

          resolve({ id: matchedRoute.route.id, data });
        } catch (error) {
          // We want the error to be propagated to the topmost catch block
          // hence we reject here
          reject(error);
        }
      });
    }

    return null;
  });

  const pageDatas = await Promise.all(matchedRoutesPromises);

  return pageDatas.reduce((acc: IPageDatas, pageData) => {
    if (pageData) {
      return { ...acc, [pageData.id]: pageData.data };
    }

    return acc;
  }, {});
};

export const getPath = ({
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

export const doesPathMatch = ({
  routeId,
  pathname,
}: {
  routeId: string;
  pathname: string;
}): boolean => {
  const path = getPath({
    routes,
    routeId,
  });

  return Boolean(matchPath(path!, pathname));
};
