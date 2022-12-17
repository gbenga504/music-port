import axios from "axios";
import passport from "passport";
import { Strategy } from "passport-spotify";

import { AxiosError } from "axios";
import type { StrategyOptions } from "passport-spotify";
import type { IMusicStreamingPlatform } from "./types";
import type { IRawPlaylist } from "../models";

import { MusicStreamingPlatformResourceFailureError } from "../errors/music-streaming-platform-resource-failure-error";

const clientID = process.env.SPOTIFY_CLIENTID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const callbackURL = process.env.FRONTEND_AUTH_CALLBACK_URL;

class Spotify implements IMusicStreamingPlatform {
  private readonly appName: string = "spotify";

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
      } as StrategyOptions,
      function (accessToken, refreshToken, expiresIn, _profile, done) {
        return done(null, { accessToken, refreshToken, expiresIn });
      },
    );
  }

  authenticate(
    ...args: Parameters<IMusicStreamingPlatform["authenticate"]>
  ): ReturnType<IMusicStreamingPlatform["authenticate"]> {
    return passport.authenticate(
      "spotify",
      {
        scope: ["playlist-modify-public"],
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
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          headers: { Authorization: "Bearer " + accessToken },
        },
      );

      return this.transformPlaylistToInternalFormat(data);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { data, status } = error.response;

        throw new MusicStreamingPlatformResourceFailureError({
          message: data?.error?.message,
          code: status,
        });
      }

      throw new MusicStreamingPlatformResourceFailureError({
        message: "An unknown error occurred",
        code: 0,
      });
    }
  }

  transformPlaylistToInternalFormat(data: {
    [key: string]: any;
  }): IRawPlaylist {
    type Image = IRawPlaylist["images"][number];
    type Song = IRawPlaylist["songs"][number];

    return {
      importLink: data.external_urls.spotify,
      importPlaylistId: data.id,
      images: data.images.map((image: Image) => ({
        url: image.url,
        width: image.width,
        height: image.height,
      })),
      apiLink: data.href,
      name: data.name,
      owner: {
        name: data.owner.display_name,
      },
      songs: data.tracks.items.map((item: any) => {
        const {
          track,
          track: { album },
        } = item;

        const artists: Song["artists"] = album.artists.map(
          (artist: { name: string }) => ({
            name: artist.name,
          }),
        );

        const images: Song["images"] = album.images.map((image: Image) => ({
          url: image.url,
          width: image.width,
          height: image.height,
        }));

        return {
          artists,
          images,
          name: track.name,
          previewURL: track.preview_url,
        };
      }),
    };
  }
}

const spotify = new Spotify();
export default spotify;
