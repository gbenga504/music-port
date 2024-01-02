import axios from "axios";
import { AxiosError } from "axios";
import passport from "passport";
import { Strategy } from "passport-youtube-v3";
import YTMusic from "ytmusic-api";

import { MusicStreamingPlatformResourceFailureError } from "../errors/music-streaming-platform-resource-failure-error";
import { WrongMusicStreamingPlatformPlaylistLinkError } from "../errors/wrong-music-streaming-platform-playlist-link-error";
import { MAX_SONGS_PER_PLAYLIST, Platform } from "../utils/platform";
import { sleep } from "../utils/sleep";

import type { IThirdPartyIntegrations } from "./types";
import type { IPlaylist, IRawPlaylist } from "../models";

const clientID = process.env.YOUTUBE_MUSIC_CLIENTID;
const clientSecret = process.env.YOUTUBE_MUSIC_CLIENT_SECRET;
const callbackURL = process.env.FRONTEND_YOUTUBE_MUSIC_AUTH_CALLBACK_URL;

class YoutubeMusic implements IThirdPartyIntegrations {
  private readonly integrationName = "youtubeMusic";
  private readonly ytMusic = new YTMusic();

  constructor() {
    this.ytMusic.initialize();
  }

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
        scope: [
          "email",
          "profile",
          "https://www.googleapis.com/auth/youtube.readonly",
          "https://www.googleapis.com/auth/youtube.force-ssl",
        ],
      },
      function (accessToken, refreshToken, profile, done) {
        return done(null, {
          accessToken,
          refreshToken,
          expiresIn: null,
          userId: profile.id,
        });
      },
    );
  }

  authenticate(
    ...args: Parameters<IThirdPartyIntegrations["authenticate"]>
  ): ReturnType<IThirdPartyIntegrations["authenticate"]> {
    return passport.authenticate(
      "youtube",
      {
        ...args[0],
      },
      args[1],
    );
  }

  getPlaylistLink({ playlistId }: { playlistId: string }): string {
    return `https://music.youtube.com/playlist?list=${playlistId}`;
  }

  async getPlaylistById({ id }: { id: string }): Promise<IRawPlaylist> {
    try {
      // Get the playlist
      const playlist = await this.ytMusic.getPlaylist(id);

      // Get the items in the playlist
      const playlistItems = await this.ytMusic.getPlaylistVideos(
        playlist.playlistId,
      );

      return this.transformPlaylistToInternalFormat({
        playlist,
        playlistItems,
      });
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

  async getPlaylistByLink({ link }: { link: string }): Promise<IRawPlaylist> {
    const playlistId = this.getPlaylistIdUsingPlaylistLinkOrThrow(link);

    return this.getPlaylistById({ id: playlistId });
  }

  getPlaylistIdUsingPlaylistLinkOrThrow(link: string): string {
    const url = new URL(link);
    const playlistId = url.searchParams.get("list");

    if (!playlistId) {
      throw new WrongMusicStreamingPlatformPlaylistLinkError();
    }

    return playlistId;
  }

  private async createPlaylistItem({
    videoId,
    playlistId,
    retries,
    accessToken,
  }: {
    videoId: string;
    playlistId: string;
    retries: number;
    accessToken: string;
  }): Promise<void> {
    // Youtube times out occassionally especially when creating multiple items
    // So we setup a retry mechanism while sleeping each retry for a few milliseconds
    if (retries <= 4) {
      try {
        await axios.post(
          `https://www.googleapis.com/youtube/v3/playlistItems`,
          {
            snippet: {
              playlistId,
              resourceId: {
                kind: "youtube#video",
                videoId,
              },
            },
          },
          {
            headers: { Authorization: "Bearer " + accessToken },
            params: {
              part: "id,snippet,contentDetails,status",
            },
          },
        );
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const { data, status } = error.response;

          if (
            status === 409 &&
            data.error.status === "ABORTED" &&
            retries <= 3
          ) {
            await sleep(100);

            return this.createPlaylistItem({
              videoId,
              playlistId,
              retries: retries + 1,
              accessToken,
            });
          }

          throw new MusicStreamingPlatformResourceFailureError({
            message: data?.error?.message,
            code: status,
          });
        }
      }
    }
  }

  async createPlaylist({
    playlist,
    accessToken,
  }: {
    playlist: IRawPlaylist;
    accessToken: string;
  }): Promise<{ url: string }> {
    try {
      // Search for the items that should be added into the playlist
      // This function should return an array of strings corresponding to
      // the uri of the track
      const videoIds = await this.searchForItems({ playlist });

      // Create a playlist for the user on youtube music
      const { data: playlistOnYoutubeMusic } = await axios.post(
        `https://www.googleapis.com/youtube/v3/playlists`,
        {
          snippet: {
            title: playlist.name,
            privacyStatus: "public",
          },
        },
        {
          headers: { Authorization: "Bearer " + accessToken },
          params: {
            part: "id,player,status,snippet,contentDetails",
          },
        },
      );

      const playlistItems = videoIds.map((videoId) =>
        this.createPlaylistItem({
          videoId,
          playlistId: playlistOnYoutubeMusic.id,
          retries: 0,
          accessToken,
        }),
      );

      await Promise.all(playlistItems);

      return {
        url: this.getPlaylistLink({ playlistId: playlistOnYoutubeMusic.id }),
      };
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
  }: {
    playlist: IRawPlaylist;
  }): Promise<string[]> {
    async function searchItem(
      song: IPlaylist["songs"][number],
      ytMusic: YTMusic,
    ): Promise<string | null> {
      const { artists, name } = song;
      const [item] = await ytMusic.searchSongs(`${name} ${artists[0].name}`);

      // We are only interested in the first item from the tracks
      // query result. The item comes with a uri we should resolve
      return item?.videoId || null;
    }

    if (playlist.songs.length > MAX_SONGS_PER_PLAYLIST) {
      throw new MusicStreamingPlatformResourceFailureError({
        message: "Can only export a maximum of 50 songs",
      });
    }

    const searchItems = playlist.songs.map((song) =>
      searchItem(song, this.ytMusic),
    );

    const items = await Promise.all(searchItems);
    const filteredItems = items.filter((item): item is string => item !== null);

    if (filteredItems.length === 0) {
      throw new MusicStreamingPlatformResourceFailureError({
        message: "There are no items to add to the playlist",
      });
    }

    return filteredItems;
  }

  transformPlaylistToInternalFormat({
    playlist,
    playlistItems,
  }: {
    playlist: Awaited<ReturnType<YTMusic["getPlaylist"]>>;
    playlistItems: Awaited<ReturnType<YTMusic["getPlaylistVideos"]>>;
  }): IRawPlaylist {
    type Song = IRawPlaylist["songs"][number];

    if (playlist.videoCount > MAX_SONGS_PER_PLAYLIST) {
      throw new MusicStreamingPlatformResourceFailureError({
        message: "Can only import a maxium of 50 songs from a playlist",
      });
    }

    let duration = 0;

    const songs = playlistItems.map((item) => {
      const images: Song["images"] = item.thumbnails.map((image) => ({
        url: image.url,
        width: image.width,
        height: image.height,
      }));

      duration += item.duration * 1000;

      const artists = item.artists.map((artist) => ({
        name: artist.name,
      })) as Song["artists"];

      return {
        artists,
        images,
        name: item.name,
        previewURL: null,
        duration: item.duration * 1000,
      };
    }) as unknown as [Song, ...Song[]];

    return {
      importLink: this.getPlaylistLink({ playlistId: playlist.playlistId }),
      platform: Platform.YoutubeMusic,
      public: false, //@todo: Get the actual public state
      importPlaylistId: playlist.playlistId,
      images: playlist.thumbnails.map((image) => ({
        url: image.url,
        width: image.width,
        height: image.height,
      })),
      apiLink: this.getPlaylistLink({ playlistId: playlist.playlistId }),
      name: playlist.name,
      owner: {
        name: "", //@todo: Get the actual owner,
      },
      duration,
      songs,
    };
  }
}

const youtubeMusic = new YoutubeMusic();
export default youtubeMusic;
