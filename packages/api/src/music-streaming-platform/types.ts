import type { RequestHandler } from "express";
import type { AuthenticateOptions } from "passport";
import type { Strategy as SpotifyStrategy } from "passport-spotify";
import type { Strategy as DeezerStrategy } from "passport-deezer";
import type { IRawPlaylist } from "../models";

interface IPlatformTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number | null;
}
export interface IMusicStreamingPlatform {
  getAppName: () => string;
  getPassportStrategy: () => DeezerStrategy | SpotifyStrategy;
  authenticate: (
    authOptions: AuthenticateOptions,
    callback?: (error: null | Error, platformTokens: IPlatformTokens) => void,
  ) => RequestHandler;
  transformPlaylistToInternalFormat: (data: any) => IRawPlaylist;
  getPlaylist: (playlistOptions: {
    accessToken: string;
    link: string;
  }) => Promise<IRawPlaylist>;
}
