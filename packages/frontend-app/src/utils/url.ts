import routes from "../app/routes";
import { getPath } from "./routeUtils";
import { ResourceError } from "../errors/resource-error";

export const constructURL = ({
  routeId,
  query,
}: {
  routeId: string;
  query?: { [key: string]: string };
}): string => {
  let path = getPath({ routes, routeId });

  if (!path) {
    throw new Error(`Cannot find path with routeId ${routeId}`);
  }

  if (query) {
    const searchParams = new URLSearchParams();

    Object.keys(query).forEach((key) => {
      searchParams.append(key, query[key]);
    });

    path += `?${searchParams.toString()}`;
  }

  return path;
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
