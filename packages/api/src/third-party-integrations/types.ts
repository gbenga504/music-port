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
  getPlaylist: (options: {
    accessToken: string;
    link: string;
  }) => Promise<IRawPlaylist>;
  createPlaylist: (options: {
    accessToken: string;
    userId: string;
    playlist: IPlaylist;
  }) => Promise<void>;
  transformPlaylistToInternalFormat: (data: any) => IRawPlaylist;
  searchForItems: (options: {
    accessToken: string;
    playlist: IPlaylist;
  }) => Promise<(string | null)[]>;
}
