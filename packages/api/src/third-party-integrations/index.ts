import { URL } from "node:url";

import spotify from "./spotify";
import deezer from "./deezer";
import youtubeMusic from "./youtube";
import { InvalidMusicStreamingPlatformError } from "../errors/invalid-music-streaming-platform-error";
import { ResourceError } from "../errors/resource-error";
import { Platform } from "../utils/platform";

import type { IThirdPartyIntegrations } from "./types";
import type { Strategy } from "passport";

export const getPassportStrategies: { [key in Platform]: Strategy } = {
  spotify: spotify.getPassportStrategy(),
  deezer: deezer.getPassportStrategy(),
  youtubeMusic: youtubeMusic.getPassportStrategy(),
};

export function authenticate(
  platform: Platform | null,
  ...rest: Parameters<IThirdPartyIntegrations["authenticate"]>
): ReturnType<IThirdPartyIntegrations["authenticate"]> {
  let authenticationMethodForPlatform = null;
  let that = null;

  switch (platform) {
    case "spotify":
      authenticationMethodForPlatform = spotify.authenticate;
      that = spotify;
      break;
    case "deezer":
      authenticationMethodForPlatform = deezer.authenticate;
      that = deezer;
      break;
    case "youtubeMusic":
      authenticationMethodForPlatform = youtubeMusic.authenticate;
      that = youtubeMusic;
      break;
    default:
      throw new InvalidMusicStreamingPlatformError({
        message: `No authentication method available for ${platform}`,
      });
  }

  return authenticationMethodForPlatform.bind(that)(...rest);
}

export function getPlaylistByLink(
  platform: Platform | null,
  ...rest: Parameters<IThirdPartyIntegrations["getPlaylistByLink"]>
): ReturnType<IThirdPartyIntegrations["getPlaylistByLink"]> {
  let getPlaylistMethod = null;
  let that = null;

  switch (platform) {
    case "spotify":
      getPlaylistMethod = spotify.getPlaylistByLink;
      that = spotify;
      break;
    case "deezer":
      getPlaylistMethod = deezer.getPlaylistByLink;
      that = deezer;
      break;
    case "youtubeMusic":
      getPlaylistMethod = youtubeMusic.getPlaylistByLink;
      that = youtubeMusic;
      break;
    default:
      throw new InvalidMusicStreamingPlatformError({
        message: `No get playlist method available for ${platform}`,
      });
  }

  return getPlaylistMethod.bind(that)(...rest);
}

export function createPlaylist(
  platform: Platform | null,
  ...rest: Parameters<IThirdPartyIntegrations["createPlaylist"]>
): ReturnType<IThirdPartyIntegrations["createPlaylist"]> {
  let createPlaylistMethod = null;
  let that = null;

  switch (platform) {
    case "spotify":
      createPlaylistMethod = spotify.createPlaylist;
      that = spotify;
      break;
    case "deezer":
      createPlaylistMethod = deezer.createPlaylist;
      that = deezer;
      break;
    case "youtubeMusic":
      createPlaylistMethod = youtubeMusic.createPlaylist;
      that = youtubeMusic;
      break;
    default:
      throw new InvalidMusicStreamingPlatformError({
        message: `No create playlist method available for ${platform}`,
      });
  }

  return createPlaylistMethod.bind(that)(...rest);
}

export function getPlatformName(link: string): Platform | null {
  const url = new URL(link);
  const origin = url.origin;

  if (origin.indexOf("spotify.com") !== -1) {
    return Platform.Spotify;
  }

  if (origin.indexOf("deezer.com") !== -1) {
    return Platform.Deezer;
  }

  if (origin.indexOf("youtube.com") !== -1) {
    return Platform.YoutubeMusic;
  }

  return null;
}

export const getPlatformNameOrThrow = (link: string): Platform => {
  const platformName = getPlatformName(link);

  if (!platformName) {
    throw new ResourceError({
      resource: "Playlist",
      message: "Playlists not currently supported",
    });
  }

  return platformName;
};

export function getImportPlaylistId(link: string): string {
  // We have a generic function here since all our music streaming platforms
  // all have the same pattern of adding the playlistId to the URL. i.e always the last path
  // If a music streaming platform ever specifies differently, then this logic
  // should be handled by each class and this function should only act as an adapter
  const url = new URL(link);
  const paths = url.pathname.split("/");
  const platform = getPlatformName(link);

  // Youtube's playlist id is a bit constructed different from others
  if (platform === Platform.YoutubeMusic) {
    return url.searchParams.get("list")!;
  }

  return paths[paths.length - 1];
}

export function getExportPlaylistId(link: string): string {
  const url = new URL(link);
  const paths = url.pathname.split("/");

  return paths[paths.length - 1];
}
