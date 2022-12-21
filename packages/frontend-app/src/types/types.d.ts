import type { RouteObject } from "react-router-dom";
import type { LoadableComponent } from "@loadable/component";

import type { ICreateApiClient } from "../app/api";
import type { IPageDatas } from "../app/utils/routeUtils";

declare module "react-router-dom" {
  type RouteObjectWithLoadData = RouteObject & {
    id: string;
    loadData?: ({ api }: { api: ICreateApiClient }) => Promise<IPageDatas>;
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
