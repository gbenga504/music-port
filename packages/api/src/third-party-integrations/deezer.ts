import axios from "axios";
import passport from "passport";
import { Strategy } from "passport-deezer";

import { AxiosError } from "axios";
import type { StrategyOptions } from "passport-deezer";
import type { IThirdPartyIntegrations } from "./types";
import type { IPlaylist, IRawPlaylist } from "../models";

import { MusicStreamingPlatformResourceFailureError } from "../errors/music-streaming-platform-resource-failure-error";

const clientID = process.env.DEEZER_CLIENTID;
const clientSecret = process.env.DEEZER_CLIENT_SECRET;
const callbackURL = process.env.FRONTEND_DEEZER_AUTH_CALLBACK_URL;

class Deezer implements IThirdPartyIntegrations {
  private readonly appName: string = "deezer";

  getAppName(): ReturnType<IThirdPartyIntegrations["getAppName"]> {
    return this.appName;
  }

  getPassportStrategy(): ReturnType<
    IThirdPartyIntegrations["getPassportStrategy"]
  > {
    return new Strategy(
      {
        clientID,
        clientSecret,
        callbackURL,
        scope: ["basic_access", "manage_library"],
      } as StrategyOptions,
      function (accessToken, refreshToken, profile, done) {
        return done(null, {
          accessToken,
          refreshToken,
          expiresIn: null,
          ownerId: profile.id,
        });
      },
    );
  }

  authenticate(
    ...args: Parameters<IThirdPartyIntegrations["authenticate"]>
  ): ReturnType<IThirdPartyIntegrations["authenticate"]> {
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
          code: data.error.code,
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

      throw error;
    }
  }

  async createPlaylist({
    accessToken,
    playlist,
  }: {
    accessToken: string;
    playlist: IPlaylist;
  }): Promise<void> {
    try {
      // Search for the items that should be added into the playlist
      // This function should return an array of strings corresponding to
      // the uri of the track
      const items = await this.searchForItems({ playlist, accessToken });
      const filteredItems = items.filter((item) => item);

      if (filteredItems.length === 0) {
        throw new MusicStreamingPlatformResourceFailureError({
          message: "There are no items to add to the playlist",
        });
      }

      // Create a playlist for the user on spotify
      const { data: playlistOnDeezer } = await axios.post(
        `https://api.deezer.com/user/me/playlists?access_token=${accessToken}`,
        {
          title: playlist.name,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (playlistOnDeezer.error) {
        throw new MusicStreamingPlatformResourceFailureError({
          message: playlistOnDeezer.error.message,
          code: playlistOnDeezer.error.code,
        });
      }

      // Add items to the playlist we created earlier
      const { data } = await axios.post(
        `https://api.deezer.com/playlist/${playlistOnDeezer.id}/tracks?access_token=${accessToken}`,
        {
          songs: items.join(","),
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (data.error) {
        throw new MusicStreamingPlatformResourceFailureError({
          message: data.error.message,
          code: data.error.code,
        });
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { data, status } = error.response;

        throw new MusicStreamingPlatformResourceFailureError({
          message: data?.error?.message,
          code: status,
        });
      }

      throw error;
    }
  }

  async searchForItems({
    playlist,
    accessToken,
  }: {
    playlist: IPlaylist;
    accessToken: string;
  }): Promise<(string | null)[]> {
    async function searchItem(
      song: IPlaylist["songs"][number],
    ): Promise<string | null> {
      const { artists, name } = song;
      const url = encodeURI(
        `https://api.deezer.com/search?q=track:"${name}" artist:"${artists[0].name}"&access_token=${accessToken}`,
      );

      const { data } = await axios.get(url);

      if (data.error) {
        throw new MusicStreamingPlatformResourceFailureError({
          message: data.error.message,
          code: data.error.code,
        });
      }

      // We are only interested in the first item from the tracks
      // query result. The item comes with a uri we should resolve
      return data?.data?.[0]?.id || null;
    }

    const searchItems = playlist.songs.map((song) => searchItem(song));

    return Promise.all(searchItems);
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
