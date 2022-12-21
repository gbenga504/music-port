import axios from "axios";
import passport from "passport";
import { Strategy } from "passport-deezer";

import { AxiosError } from "axios";
import type { StrategyOptions } from "passport-deezer";
import type { IMusicStreamingPlatform } from "./types";
import type { IRawPlaylist } from "../models";

import { MusicStreamingPlatformResourceFailureError } from "../errors/music-streaming-platform-resource-failure-error";

const clientID = process.env.DEEZER_CLIENTID;
const clientSecret = process.env.DEEZER_CLIENT_SECRET;
const callbackURL = process.env.FRONTEND_DEEZER_AUTH_CALLBACK_URL;

class Deezer implements IMusicStreamingPlatform {
  private readonly appName: string = "deezer";

  getAppName(): ReturnType<IMusicStreamingPlatform["getAppName"]> {
    return this.appName;
  }

  getPassportStrategy(): ReturnType<
    IMusicStreamingPlatform["getPassportStrategy"]
  > {
    return new Strategy(
      {
        clientID,
        clientSecret,
        callbackURL,
        scope: ["basic_access", "manage_library"],
      } as StrategyOptions,
      function (accessToken, refreshToken, _profile, done) {
        return done(null, { accessToken, refreshToken, expiresIn: null });
      },
    );
  }

  authenticate(
    ...args: Parameters<IMusicStreamingPlatform["authenticate"]>
  ): ReturnType<IMusicStreamingPlatform["authenticate"]> {
    return passport.authenticate(
      "deezer",
      {
        ...args[0],
      },
      args[1],
    );
  }

  async getPlaylist({
    accessToken,
    link,
  }: {
    accessToken: string;
    link: string;
  }): Promise<IRawPlaylist> {
    const url = new URL(link);
    const paths = url.pathname.split("/");
    const playlistId = paths[paths.length - 1];

    try {
      const { data } = await axios.get(
        `https://api.deezer.com/playlist/${playlistId}`,
        {
          headers: { Authorization: "Bearer " + accessToken },
          params: {
            access_token: accessToken,
          },
        },
      );

      if (data.error) {
        throw new MusicStreamingPlatformResourceFailureError({
          message: data.error.message,
          code: data.error.code || 0,
        });
      }

      return this.transformPlaylistToInternalFormat({ data, importLink: link });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { data, status } = error.response;

        throw new MusicStreamingPlatformResourceFailureError({
          message: data?.error?.message,
          code: status,
        });
      }

      if (error instanceof MusicStreamingPlatformResourceFailureError) {
        throw new MusicStreamingPlatformResourceFailureError({
          message: error.message,
          code: error.code,
        });
      }

      throw new MusicStreamingPlatformResourceFailureError({
        message: "An unknown error occurred",
        code: 0,
      });
    }
  }

  transformPlaylistToInternalFormat({
    data,
    importLink,
  }: {
    data: {
      [key: string]: any;
    };
    importLink: string;
  }): IRawPlaylist {
    return {
      importLink,
      importPlaylistId: data.id,
      images: [
        { url: data.picture_small, width: 56, height: 56 },
        { url: data.picture_medium, width: 250, height: 250 },
        { url: data.picture_big, width: 500, height: 500 },
      ],
      apiLink: data.tracklist,
      name: data.title,
      owner: {
        name: data.creator.name,
      },
      songs: data.tracks.data.map((item: any) => {
        return {
          artists: [
            {
              name: item.artist.name,
            },
          ],
          images: [
            { url: item.album.cover_small, width: 56, height: 56 },
            { url: item.album.cover_medium, width: 250, height: 250 },
            { url: item.album.cover_big, width: 500, height: 500 },
          ],
          name: item.title,
          previewURL: item.preview,
        };
      }),
    };
  }
}

const deezer = new Deezer();
export default deezer;
