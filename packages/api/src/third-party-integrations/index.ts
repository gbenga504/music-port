import { URL } from "node:url";

import deezer from "./deezer";
import spotify from "./spotify";
import youtubeMusic from "./youtube";

import { InvalidMusicStreamingPlatformError } from "../errors/invalid-music-streaming-platform-error";
import { ResourceError } from "../errors/resource-error";
import { Platform } from "../utils/platform";

import type { IThirdPartyIntegrations } from "./types";
import type { PlatformType } from "../utils/platform";
import type { Strategy } from "passport";

export const getPassportStrategies: { [key in PlatformType]: Strategy } = {
  spotify: spotify.getPassportStrategy(),
  deezer: deezer.getPassportStrategy(),
  youtubeMusic: youtubeMusic.getPassportStrategy(),
};

export function authenticate(
  platform: PlatformType | null,
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
  platform: PlatformType | null,
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
  platform: PlatformType | null,
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

export function getPlaylistIdUsingPlaylistLinkOrThrow(
  platform: PlatformType | null,
  ...rest: Parameters<
    IThirdPartyIntegrations["getPlaylistIdUsingPlaylistLinkOrThrow"]
  >
): ReturnType<
  IThirdPartyIntegrations["getPlaylistIdUsingPlaylistLinkOrThrow"]
> {
  let getPlaylistIdUsingPlaylistLinkOrThrowMethod = null;
  let that = null;

  switch (platform) {
    case "spotify":
      getPlaylistIdUsingPlaylistLinkOrThrowMethod =
        spotify.getPlaylistIdUsingPlaylistLinkOrThrow;
      that = spotify;
      break;
    case "deezer":
      getPlaylistIdUsingPlaylistLinkOrThrowMethod =
        deezer.getPlaylistIdUsingPlaylistLinkOrThrow;
      that = deezer;
      break;
    case "youtubeMusic":
      getPlaylistIdUsingPlaylistLinkOrThrowMethod =
        youtubeMusic.getPlaylistIdUsingPlaylistLinkOrThrow;
      that = youtubeMusic;
      break;
    default:
      throw new InvalidMusicStreamingPlatformError({
        message: `No create playlist method available for ${platform}`,
      });
  }

  return getPlaylistIdUsingPlaylistLinkOrThrowMethod.bind(that)(...rest);
}

export function getPlatformName(link: string): PlatformType | null {
  const url = new URL(link);
  const origin = url.origin;

  if (origin.includes("spotify.com")) {
    return Platform.Spotify;
  }

  if (origin.includes("deezer.com")) {
    return Platform.Deezer;
  }

  if (origin.includes("youtube.com")) {
    return Platform.YoutubeMusic;
  }

  return null;
}

export const getPlatformNameOrThrow = (link: string): PlatformType => {
  const platformName = getPlatformName(link);

  if (!platformName) {
    throw new ResourceError({
      resource: "Playlist",
      message: "Playlists not currently supported",
    });
  }

  return platformName;
};

export function getExportPlaylistId(link: string): string {
  const url = new URL(link);
  const paths = url.pathname.split("/");

  return paths.at(-1)!;
}
