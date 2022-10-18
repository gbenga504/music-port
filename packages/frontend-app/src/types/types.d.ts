import type { RouteObject } from "react-router-dom";
import type { LoadableComponent } from "@loadable/component";

declare module "react-router-dom" {
  type RouteObjectWithLoadData = RouteObject & {
    id: string;
    loadData?: Function;
    component: LoadableComponent;
  };
}
