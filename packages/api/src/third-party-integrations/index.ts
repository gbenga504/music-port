import { URL } from "node:url";

import spotify from "./spotify";
import deezer from "./deezer";
import { InvalidMusicStreamingPlatformError } from "../errors/invalid-music-streaming-platform-error";

import type { IMusicStreamingPlatform } from "./types";

export const getPassportStrategies = {
  spotify: spotify.getPassportStrategy(),
  deezer: deezer.getPassportStrategy(),
};

export function authenticate(
  platform: string | null,
  ...rest: Parameters<IMusicStreamingPlatform["authenticate"]>
): ReturnType<IMusicStreamingPlatform["authenticate"]> {
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
    default:
      throw new InvalidMusicStreamingPlatformError({
        message: `No authentication method available for ${platform}`,
      });
  }

  return authenticationMethodForPlatform.bind(that)(...rest);
}

export function getPlaylist(
  platform: string | null,
  ...rest: Parameters<IMusicStreamingPlatform["getPlaylist"]>
): ReturnType<IMusicStreamingPlatform["getPlaylist"]> {
  let getPlaylistMethod = null;
  let that = null;

  switch (platform) {
    case "spotify":
      getPlaylistMethod = spotify.getPlaylist;
      that = spotify;
      break;
    case "deezer":
      getPlaylistMethod = deezer.getPlaylist;
      that = deezer;
      break;
    default:
      throw new InvalidMusicStreamingPlatformError({
        message: `No get playlist method available for ${platform}`,
      });
  }

  return getPlaylistMethod.bind(that)(...rest);
}

export function createPlaylist(
  platform: string | null,
  ...rest: Parameters<IMusicStreamingPlatform["createPlaylist"]>
): ReturnType<IMusicStreamingPlatform["createPlaylist"]> {
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
    default:
      throw new InvalidMusicStreamingPlatformError({
        message: `No create playlist method available for ${platform}`,
      });
  }

  return createPlaylistMethod.bind(that)(...rest);
}

export function getPlatformName(link: string): string | null {
  const url = new URL(link);
  const origin = url.origin;

  if (origin.indexOf("spotify.com") !== -1) {
    return "spotify";
  }

  if (origin.indexOf("deezer.com") !== -1) {
    return "deezer";
  }

  return null;
}

export function getImportPlaylistId(link: string): string {
  // We have a generic function here since all our music streaming platforms
  // all have the same pattern of adding the playlistId to the URL. i.e always the last path
  // If a music streaming platform ever specifies differently, then this logic
  // should be handled by each class and this function should only act as an adapter
  const url = new URL(link);
  const paths = url.pathname.split("/");

  return paths[paths.length - 1];
}

export function getExportPlaylistId(link: string): string {
  const url = new URL(link);
  const paths = url.pathname.split("/");

  return paths[paths.length - 1];
}
