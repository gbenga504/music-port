import type { RequestHandler } from "express";
import type { AuthenticateOptions } from "passport";
import type { Strategy as SpotifyStrategy } from "passport-spotify";
import type { Strategy as DeezerStrategy } from "passport-deezer";
import type { IPlaylist, IRawPlaylist } from "../models";

interface IPlatformTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number | null;
  userId: string;
}
export interface IThirdPartyIntegrations {
  getIntegrationName: () => string;
  getPassportStrategy: () => DeezerStrategy | SpotifyStrategy;
  authenticate: (
    authOptions: AuthenticateOptions,
    callback?: (error: null | Error, platformTokens: IPlatformTokens) => void,
  ) => RequestHandler;
  getPlaylistByLink: (options: {
    accessToken: string;
    link: string;
  }) => Promise<IRawPlaylist>;
  getPlaylistById: (options: {
    accessToken: string;
    id: string;
  }) => Promise<IRawPlaylist>;
  createPlaylist: (options: {
    accessToken: string;
    userId: string;
    playlist: IRawPlaylist;
  }) => Promise<{ url: string }>;
  transformPlaylistToInternalFormat: (data: any) => IRawPlaylist;
  searchForItems: (options: {
    accessToken: string;
    playlist: IRawPlaylist;
  }) => Promise<(string | null)[]>;
}
