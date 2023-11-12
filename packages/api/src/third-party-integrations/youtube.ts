import axios from "axios";
import { AxiosError } from "axios";
import passport from "passport";
import { Strategy } from "passport-youtube-v3";

import { MusicStreamingPlatformResourceFailureError } from "../errors/music-streaming-platform-resource-failure-error";
import { MAX_SONGS_PER_PLAYLIST, Platform } from "../utils/platform";

import type { IThirdPartyIntegrations } from "./types";
import type { IPlaylist, IRawPlaylist } from "../models";


const clientID = process.env.YOUTUBE_MUSIC_CLIENTID;
const clientSecret = process.env.YOUTUBE_MUSIC_CLIENT_SECRET;
const apiKey = process.env.YOUTUBE_MUSIC_API_KEY;
const callbackURL = process.env.FRONTEND_YOUTUBE_MUSIC_AUTH_CALLBACK_URL;

interface IYoutubeSong {
  id: string;
  snippet: {
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: string;
        height: string;
      };
    };
    channelTitle: string;
  };
  contentDetails: {
    duration: string;
  };
  status: {
    privacyStatus: string;
  };
  player: {
    embedHtml: string;
  };
}

interface IYoutubePlaylistItem {
  id: string;
  snippet: {
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: string;
        height: string;
      };
    };
    videoOwnerChannelTitle: string;
    channelTitle: string;
  };
  status: {
    privacyStatus: string;
  };
  contentDetails: {
    videoId: string;
  };
  songDetails: IYoutubeSong;
}

interface IYoutubePlaylist {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: string;
        height: string;
      };
    };
    channelTitle: string;
  };
  player: {
    embedHtml: string;
  };
  contentDetails: {
    itemCount: number;
  };
  status: {
    privacyStatus: string;
  };
  playlistItems: IYoutubePlaylistItem[];
}

class YoutubeMusic implements IThirdPartyIntegrations {
  private readonly integrationName = "youtubeMusic";

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

  async getSongs({
    songIds,
    accessToken,
  }: {
    songIds: string;
    accessToken: string;
  }): Promise<IYoutubeSong[]> {
    try {
      const result = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos`,
        {
          headers: { Authorization: "Bearer " + accessToken },
          params: {
            key: apiKey,
            id: songIds,
            part: "contentDetails,id,player,snippet,status",
            maxResults: 50,
          },
        },
      );

      return result.data.items;
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

  async getPlaylistItems({
    playlistId,
    accessToken,
  }: {
    playlistId: string;
    accessToken: string;
  }): Promise<IYoutubePlaylistItem[]> {
    try {
      let nextPageToken = undefined;
      let playlistItems: Omit<IYoutubePlaylistItem, "songDetails">[] = [];

      // Get all the items in a playlist
      while (nextPageToken !== null) {
        const result: any = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems`,
          {
            headers: { Authorization: "Bearer " + accessToken },
            params: {
              key: apiKey,
              playlistId,
              part: "id,snippet,status,contentDetails",
              maxResults: 50,
              pageToken: nextPageToken,
            },
          },
        );

        nextPageToken = result.data.nextPageToken ?? null;
        playlistItems = [...playlistItems, ...result.data.items];
      }

      // Using the items of the playlist, get the details of each item
      function getSongIds({
        items,
      }: {
        items: Omit<IYoutubePlaylistItem, "songDetails">[];
      }): string {
        const songIds = items.splice(0, 50);

        return songIds.map((item) => item.contentDetails.videoId).join(",");
      }

      const tempPlaylistItems = [...playlistItems];
      let results: IYoutubePlaylistItem[] = [];

      while (tempPlaylistItems.length > 0) {
        // We remove the ids that have been queried for
        const songs = await this.getSongs({
          songIds: getSongIds({ items: tempPlaylistItems }),
          accessToken,
        });

        results = songs.reduce((acc, song) => {
          const playlist = playlistItems.find(
            (playlistItem) => playlistItem.contentDetails.videoId === song.id,
          );

          acc.push({ ...playlist, songDetails: song } as IYoutubePlaylistItem);

          return acc;
        }, results);
      }

      return results;
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

  getPlaylistLink({ playlistId }: { playlistId: string }): string {
    return `https://music.youtube.com/playlist?list=${playlistId}`;
  }

  async getPlaylistById({
    accessToken,
    id,
  }: {
    accessToken: string;
    id: string;
  }): Promise<IRawPlaylist> {
    try {
      // Get the playlist
      const { data } = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlists`,
        {
          headers: { Authorization: "Bearer " + accessToken },
          params: {
            key: apiKey,
            id,
            part: "id,snippet,status,contentDetails,player,localizations",
            maxResults: 1,
          },
        },
      );

      // Get the items in the playlist
      const playlistItems = await this.getPlaylistItems({
        playlistId: data.items[0].id,
        accessToken,
      });

      return this.transformPlaylistToInternalFormat({
        ...data.items[0],
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

  async getPlaylistByLink({
    accessToken,
    link,
  }: {
    accessToken: string;
    link: string;
  }): Promise<IRawPlaylist> {
    const url = new URL(link);
    const playlistId = url.searchParams.get("list")!;

    return this.getPlaylistById({ accessToken, id: playlistId });
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
      const items = await this.searchForItems({ playlist, accessToken });

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

      // Add items to the playlist we created earlier
      type SearchedItems = Awaited<ReturnType<typeof this.searchForItems>>;

      async function createPlaylistItem({
        item,
        playlistId,
      }: {
        item: SearchedItems[number];
        playlistId: string;
      }) {
        await axios.post(
          `https://www.googleapis.com/youtube/v3/playlistItems`,
          {
            snippet: {
              playlistId,
              resourceId: item.id,
            },
          },
          {
            headers: { Authorization: "Bearer " + accessToken },
            params: {
              part: "id",
            },
          },
        );
      }

      const playlistItems = items.map((item) =>
        createPlaylistItem({ item, playlistId: playlistOnYoutubeMusic.id }),
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
    accessToken,
  }: {
    playlist: IRawPlaylist;
    accessToken: string;
  }): Promise<{ id: { videoId: string } }[]> {
    async function searchItem(
      song: IPlaylist["songs"][number],
    ): Promise<{ id: { videoId: string } } | null> {
      const { artists, name } = song;
      const url = encodeURI(`https://www.googleapis.com/youtube/v3/search`);

      const { data } = await axios.get(url, {
        params: {
          part: "snippet",
          maxResults: 1,
          type: "video",
          q: `${name} ${artists[0].name}`,
        },
        headers: { Authorization: "Bearer " + accessToken },
      });

      // We are only interested in the first item from the tracks
      // query result. The item comes with a uri we should resolve
      return data.items[0] || null;
    }

    if (playlist.songs.length > MAX_SONGS_PER_PLAYLIST) {
      throw new MusicStreamingPlatformResourceFailureError({
        message: "Can only export a maximum of 50 songs",
      });
    }

    const searchItems = playlist.songs.map((song) => searchItem(song));

    const items = await Promise.all(searchItems);
    const filteredItems = items.filter(
      (item): item is { id: { videoId: string } } => item !== null,
    );

    if (filteredItems.length === 0) {
      throw new MusicStreamingPlatformResourceFailureError({
        message: "There are no items to add to the playlist",
      });
    }

    return filteredItems;
  }

  convertDurationToMilliseconds(duration: string): number {
    // The duration is an ISO 8601 string.
    // Whcih is usually in the format P#DT#H#M#S, PT#M#S or PT#H#M#S
    // We need to convert that to milliseconds
    const durationArray = duration.split(/[a-z]+/i).filter(Boolean);

    return durationArray.reverse().reduce((acc, duration, index) => {
      return acc + Number(duration) * Math.pow(60, index) * 1000;
    }, 0);
  }

  transformPlaylistToInternalFormat(data: IYoutubePlaylist): IRawPlaylist {
    type Song = IRawPlaylist["songs"][number];

    if (data.playlistItems.length > MAX_SONGS_PER_PLAYLIST) {
      throw new MusicStreamingPlatformResourceFailureError({
        message: "Can only import a maxium of 50 songs from a playlist",
      });
    }

    let duration = 0;

    const songs = data.playlistItems.map((item) => {
      const images: Song["images"] = Object.values(
        item.songDetails.snippet.thumbnails,
      ).map((image) => ({
        url: image.url,
        width: Number(image.width),
        height: Number(image.height),
      }));

      duration += this.convertDurationToMilliseconds(
        item.songDetails.contentDetails.duration,
      );

      return {
        artists: [
          {
            // We have an ' - Topic' attached to some titles so we take this off
            name: item.snippet.videoOwnerChannelTitle.replaceAll(
              /\s?-?\s?topic/gi,
              "",
            ),
          },
        ],
        images,
        name: item.songDetails.snippet.title,
        previewURL: item.songDetails.player.embedHtml,
        duration: this.convertDurationToMilliseconds(
          item.songDetails.contentDetails.duration,
        ),
      };
    });

    return {
      importLink: this.getPlaylistLink({ playlistId: data.id }),
      platform: Platform.YoutubeMusic,
      public: data.status.privacyStatus !== "private",
      importPlaylistId: data.id,
      images: Object.values(data.snippet.thumbnails).map((image) => ({
        url: image.url,
        width: Number(image.width),
        height: Number(image.height),
      })),
      apiLink: this.getPlaylistLink({ playlistId: data.id }),
      // We have an 'Album - ' attached to some titles so we take this off
      name: data.snippet.title.replaceAll(/album\s?-?\s?/gi, ""),
      owner: {
        name: "",
      },
      duration,
      songs: songs as [Song, ...Song[]],
    };
  }
}

const youtubeMusic = new YoutubeMusic();
export default youtubeMusic;
