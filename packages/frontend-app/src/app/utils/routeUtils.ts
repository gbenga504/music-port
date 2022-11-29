import { matchRoutes } from "react-router-dom";

import type { RouteObjectWithLoadData } from "react-router-dom";
import type { createApiClient } from "../api";

export interface IPageDatas {
  [key: string]: any;
}

export interface ILoadableComponentProps {
  pageData: { [key: string]: any } | null;
  api: ReturnType<typeof createApiClient>;
}

export interface ILoadData {
  api: ReturnType<typeof createApiClient>;
}

export type IMacthedRoutes = ReturnType<
  typeof matchRoutes<RouteObjectWithLoadData>
>;

interface ILoadPageDataPromise {
  id: string;
  data: object | null;
}

export const loadPageResources = async (
  matchedRoutes: IMacthedRoutes,
  api: ReturnType<typeof createApiClient>,
): Promise<IPageDatas> => {
  const matchedRoutesPromises = matchedRoutes!.map((matchedRoute) => {
    if (matchedRoute.route.loadData) {
      return new Promise<ILoadPageDataPromise>(async (resolve) => {
        let data = null;

        await matchedRoute.route.component.load();

        if (matchedRoute.route.loadData) {
          data = await matchedRoute.route.loadData({ api });
        }

        resolve({ id: matchedRoute.route.id, data });
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
