import { generatePath } from "react-router-dom";

import { getPath } from "./route-utils";

import { PlaylistPlatform } from "../app/api/graphql/graphql-client.gen";
import routes from "../app/routes";
import { ResourceError } from "../errors/resource-error";

export const constructURL = ({
  routeId,
  query,
  params,
}: {
  routeId: string;
  query?: { [key: string]: string | undefined | null };
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
      if (query[key]) {
        searchParams.append(key, query[key]!);
      }
    });

    path += `?${searchParams.toString()}`;
  }

  return path;
};

export const getPlatformName = (link: string): PlaylistPlatform | null => {
  let origin: string | null;

  try {
    const url = new URL(link);
    origin = url.origin;
  } catch {
    origin = "";
  }

  if (origin.includes("spotify.com")) {
    return PlaylistPlatform.Spotify;
  }

  if (origin.includes("deezer.com")) {
    return PlaylistPlatform.Deezer;
  }

  if (origin.includes("youtube.com")) {
    return PlaylistPlatform.YoutubeMusic;
  }

  return null;
};

export const getPlatformNameOrThrow = (link: string): PlaylistPlatform => {
  const platformName = getPlatformName(link);

  if (!platformName) {
    throw new ResourceError({
      message: "Playlists not currently supported",
    });
  }

  return platformName;
};
