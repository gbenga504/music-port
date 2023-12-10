import axios from "axios";
import { AxiosError } from "axios";
import passport from "passport";
import { Strategy } from "passport-spotify";

import { MusicStreamingPlatformResourceFailureError } from "../errors/music-streaming-platform-resource-failure-error";
import { MAX_SONGS_PER_PLAYLIST, Platform } from "../utils/platform";

import type { IThirdPartyIntegrations } from "./types";
import type { IPlaylist, IRawPlaylist } from "../models";

const clientID = process.env.SPOTIFY_CLIENTID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const callbackURL = process.env.FRONTEND_SPOTIFY_AUTH_CALLBACK_URL;

class Spotify implements IThirdPartyIntegrations {
  private readonly integrationName = "spotify";

  getIntegrationName(): ReturnType<
    IThirdPartyIntegrations["getIntegrationName"]
  > {
    return this.integrationName;
  }

  getPassportStrategy(): ReturnType<
    IThirdPartyIntegrations["getPassportStrategy"]
  > {
    return new Strategy(
      {
        clientID: clientID!,
        clientSecret: clientSecret!,
        callbackURL: callbackURL!,
      },
      function (accessToken, refreshToken, expiresIn, profile, done) {
        return done(null, {
          accessToken,
          refreshToken,
          expiresIn,
          userId: profile.id,
        });
      },
    );
  }

  authenticate(
    ...args: Parameters<IThirdPartyIntegrations["authenticate"]>
  ): ReturnType<IThirdPartyIntegrations["authenticate"]> {
    return passport.authenticate(
      "spotify",
      {
        scope: ["playlist-modify-public"],
        ...args[0],
      },
      args[1],
    );
  }

  async getPlaylistById({
    accessToken,
    id,
  }: {
    accessToken: string;
    id: string;
  }): Promise<IRawPlaylist> {
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/playlists/${id}`,
        {
          headers: { Authorization: "Bearer " + accessToken },
        },
      );

      return this.transformPlaylistToInternalFormat(data);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { data, status, statusText } = error.response;

        throw new MusicStreamingPlatformResourceFailureError({
          message: data?.error?.message || statusText,
          code: status,
        });
      }

      throw error;
    }
  }

  async getPlaylistByLink({
    accessToken,
    link,
  }: {
    accessToken: string;
    link: string;
  }): Promise<IRawPlaylist> {
    const url = new URL(link);
    const paths = url.pathname.split("/");
    const playlistId = paths.at(-1)!;

    return this.getPlaylistById({ accessToken, id: playlistId });
  }

  async createPlaylist({
    playlist,
    accessToken,
    userId,
  }: {
    playlist: IRawPlaylist;
    accessToken: string;
    userId: string;
  }): Promise<{ url: string }> {
    try {
      // Search for the items that should be added into the playlist
      // This function should return an array of strings corresponding to
      // the uri of the track
      const items = await this.searchForItems({ playlist, accessToken });

      // Create a playlist for the user on spotify
      const { data: playlistOnSpotify } = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          name: playlist.name,
          public: true,
          collaborative: false,
        },
        {
          headers: { Authorization: "Bearer " + accessToken },
        },
      );

      // Add items to the playlist we created earlier
      await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistOnSpotify.id}/tracks`,
        {
          uris: items,
        },
        {
          headers: { Authorization: "Bearer " + accessToken },
        },
      );

      return { url: playlistOnSpotify.external_urls.spotify };
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
    playlist: IRawPlaylist;
    accessToken: string;
  }): Promise<string[]> {
    async function searchItem(
      song: IPlaylist["songs"][number],
    ): Promise<string | null> {
      const { artists, name } = song;
      const url = encodeURI(
        `https://api.spotify.com/v1/search?q=${name}&artist:${artists[0].name}`,
      );

      const { data } = await axios.get(url, {
        params: {
          type: "track",
          limit: 10,
        },
        headers: { Authorization: "Bearer " + accessToken },
      });

      // We are only interested in the first item from the tracks
      // query result. The item comes with a uri we should resolve
      const {
        tracks: { items },
      } = data;

      return items?.[0].uri || null;
    }

    if (playlist.songs.length > MAX_SONGS_PER_PLAYLIST) {
      throw new MusicStreamingPlatformResourceFailureError({
        message: "Can only export a maximum of 50 songs",
      });
    }

    const searchItems = playlist.songs.map((song) => searchItem(song));

    const items = await Promise.all(searchItems);
    const filteredItems: string[] = items.filter(
      (item): item is string => item !== null,
    );

    if (filteredItems.length === 0) {
      throw new MusicStreamingPlatformResourceFailureError({
        message: "There are no items to add to the playlist",
      });
    }

    return filteredItems;
  }

  transformPlaylistToInternalFormat(data: {
    [key: string]: any;
  }): IRawPlaylist {
    type Image = IRawPlaylist["images"][number];
    type Song = IRawPlaylist["songs"][number];

    if (data.tracks.items.length > MAX_SONGS_PER_PLAYLIST) {
      throw new MusicStreamingPlatformResourceFailureError({
        message: "Can only import a maxium of 50 songs from a playlist",
      });
    }

    let duration = 0;

    const songs = data.tracks.items.map((item: any) => {
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

      duration += track.duration_ms;

      return {
        artists,
        images,
        name: track.name,
        previewURL: track.preview_url,
        duration: track.duration_ms,
      };
    });

    return {
      importLink: data.external_urls.spotify,
      platform: Platform.Spotify,
      public: Boolean(data.public),
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
      duration,
      songs,
    };
  }
}

const spotify = new Spotify();
export default spotify;
