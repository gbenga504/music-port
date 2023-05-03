import type { RouteObject } from "react-router-dom";
import type { LoadableComponent } from "@loadable/component";

import type { ICreateApiClient } from "../app/api";
import type { IPageDatas } from "../app/utils/routeUtils";
import type { ILoadData } from "../utils/routeUtils";

declare module "react-router-dom" {
  interface IndexRouteObject {
    component: LoadableComponent;
  }

  type RouteObjectWithLoadData = RouteObject & {
    id: string;
    loadData?: (options: ILoadData<any>) => Promise<IPageDatas>;
    component: LoadableComponent;
    children?: RouteObjectWithLoadData[];
  };
}

declare global {
  namespace Express {
    interface Request {
      api: ICreateApiClient;
    }
  }

  interface Error {
    status: number;
  }
}
