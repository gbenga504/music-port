import routes from "../app/routes";
import { getPath } from "./routeUtils";
import { ResourceError } from "../errors/resource-error";

export const constructURL = ({ routeId }: { routeId: string }): string => {
  const path = getPath({ routes, routeId });

  if (path) {
    return path;
  }

  throw new Error(`Cannot find path with routeId ${routeId}`);
};

export const getPlatformName = (link: string): string | null => {
  const url = new URL(link);
  const origin = url.origin;

  if (origin.indexOf("spotify.com") !== -1) {
    return "spotify";
  }

  if (origin.indexOf("deezer.com") !== -1) {
    return "deezer";
  }

  throw new ResourceError({ message: "Platform link is not recognized" });
};
