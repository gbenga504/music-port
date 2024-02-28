import type { ICreateApiClient } from "../app/api";
import type { IPageDatas } from "../app/utils/routeUtils";
import type { ILoadData } from "../utils/route-utils";
import type { LoadableComponent } from "@loadable/component";
import type { RouteObject } from "react-router-dom";

declare module "react-router-dom" {
  type RouteObjectWithLoadData = RouteObject & {
    id: string;
    loadData?: (options: ILoadData<any, any>) => Promise<IPageDatas>;
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

export type ObjectValues<T> = T[keyof T];
