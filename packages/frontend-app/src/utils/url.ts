import routes from "../app/routes";
import { getPath } from "./routeUtils";

export const constructURL = ({ routeId }: { routeId: string }): string => {
  const path = getPath({ routes, routeId });

  if (path) {
    return path;
  }

  throw new Error(`Cannot find path with routeId ${routeId}`);
};
