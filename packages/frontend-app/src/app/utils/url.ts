import routes from "../routes";
import { getPath } from "./routeUtils";

export const constructURL = ({ routeId }: { routeId: string }): string => {
  const path = getPath({ routes, routeId });

  if (path) {
    return path;
  }

  // TODO: throw a proper error
  throw new Error("Cannot find path");
};
