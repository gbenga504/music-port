import type {
  PlaylistGenre,
  PlaylistPlatform,
} from "./graphql/graphql-client.gen";
import type { IBaseClientParams } from "./types";

export class Playlist {
  private graphQLClient: IBaseClientParams["graphQLClient"];

  constructor({ graphQLClient }: IBaseClientParams) {
    this.graphQLClient = graphQLClient;
  }

  async convertPlaylist({
    platform,
    exportId,
  }: {
    platform: PlaylistPlatform;
    exportId: string;
  }) {
    const { convertPlaylist } = await this.graphQLClient.convertPlaylist({
      platform,
      playlistExportId: exportId,
    });

    return convertPlaylist;
  }

  async createPlaylist({
    author,
    playlistLink,
    playlistGenre,
    platform,
  }: {
    author: string;
    playlistLink: string;
    playlistGenre: PlaylistGenre;
    platform: PlaylistPlatform;
  }) {
    const { createPlaylist } = await this.graphQLClient.createPlaylist({
      author,
      playlistLink,
      playlistGenre,
      platform,
    });

    return createPlaylist;
  }

  async getPlaylists({
    genre,
    currentPage,
    pageSize,
  }: {
    genre: PlaylistGenre | null;
    currentPage: number;
    pageSize: number;
  }) {
    const { playlists } = await this.graphQLClient.playlists({
      genre,
      currentPage,
      pageSize,
    });

    return playlists;
  }

  async getPlaylistSongs({
    playlistId,
    currentPage,
    pageSize,
  }: {
    playlistId: string;
    currentPage: number;
    pageSize: number;
  }) {
    const { playlistSongs } = await this.graphQLClient.playlistSongs({
      playlistId,
      currentPage,
      pageSize,
    });

    return playlistSongs;
  }

  async getFeaturedPlaylists() {
    const { featuredPlaylists } = await this.graphQLClient.featuredPlaylists();

    return featuredPlaylists;
  }

  async getPlaylistsByGenre({ genre }: { genre: PlaylistGenre }) {
    const { playlistsByGenre } = await this.graphQLClient.playlistsByGenre({
      genre,
    });

    return playlistsByGenre;
  }
}
