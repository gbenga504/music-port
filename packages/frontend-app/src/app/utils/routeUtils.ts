import { matchRoutes } from "react-router-dom";

import type { RouteObjectWithLoadData } from "react-router-dom";

interface ILoadPageDataPromise {
  id: string;
  data: object | null;
}

export interface IPageDatas {
  [key: string]: object | null;
}

export interface ILoadableComponentProps {
  pageData: { [key: string]: any } | null;
}

export type IMacthedRoutes = ReturnType<
  typeof matchRoutes<RouteObjectWithLoadData>
>;

export const loadPageResources = async (
  matchedRoutes: IMacthedRoutes,
  shouldLoadComponent = false,
): Promise<IPageDatas> => {
  const matchedRoutesPromises = matchedRoutes!.map((matchedRoute) => {
    if (matchedRoute.route.loadData) {
      return new Promise<ILoadPageDataPromise>(async (resolve) => {
        if (matchedRoute.route.loadData) {
          const data = await matchedRoute.route.loadData();

          if (shouldLoadComponent) {
            await matchedRoute.route.component.load();
          }

          resolve({ id: matchedRoute.route.id, data });
        }

        resolve({ id: matchedRoute.route.id, data: null });
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
