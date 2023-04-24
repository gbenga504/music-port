import { generatePath } from "react-router-dom";

import routes from "../app/routes";
import { getPath } from "./routeUtils";
import { ResourceError } from "../errors/resource-error";
import { Platform } from "./platform";

export const constructURL = ({
  routeId,
  query,
  params,
}: {
  routeId: string;
  query?: { [key: string]: string };
  params?: { [key: string]: string | number };
}): string => {
  let path = getPath({ routes, routeId });

  if (!path) {
    throw new Error(`Cannot find path with routeId ${routeId}`);
  }

  path = generatePath(path, params);

  if (query) {
    const searchParams = new URLSearchParams();

    Object.keys(query).forEach((key) => {
      searchParams.append(key, query[key]);
    });

    path += `?${searchParams.toString()}`;
  }

  return path;
};

export const getPlatformName = (link: string): Platform | null => {
  let origin: string | null;

  try {
    const url = new URL(link);
    origin = url.origin;
  } catch (error) {
    origin = "";
  }

  if (origin.indexOf("spotify.com") !== -1) {
    return Platform.Spotify;
  }

  if (origin.indexOf("deezer.com") !== -1) {
    return Platform.Deezer;
  }

  return null;
};

export const getPlatformNameOrThrow = (link: string): Platform => {
  const platformName = getPlatformName(link);

  if (!platformName) {
    throw new ResourceError({
      message: "Playlists not currently supported",
    });
  }

  return platformName;
};
