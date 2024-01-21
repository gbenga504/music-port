import type { PlaylistPlatform } from "./graphql/graphql-client.gen";
import type { IBaseClientParams } from "./types";

export class Playlist {
  private graphQLClient: IBaseClientParams["graphQLClient"];

  constructor({ graphQLClient }: IBaseClientParams) {
    this.graphQLClient = graphQLClient;
  }

  async portPlaylist({
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
    playlistGenreId,
    platform,
  }: {
    author: string;
    playlistLink: string;
    playlistGenreId: string;
    platform: PlaylistPlatform;
  }) {
    const { createPlaylist } = await this.graphQLClient.createPlaylist({
      author,
      playlistLink,
      playlistGenreId,
      platform,
    });

    return createPlaylist;
  }

  async getPlaylists({
    genreId,
    currentPage,
    pageSize,
  }: {
    genreId: string;
    currentPage: number;
    pageSize: number;
  }) {
    const { playlists } = await this.graphQLClient.playlists({
      genreId,
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

  async getPlaylistsByGenre({ genreId }: { genreId: string }) {
    const { playlistsByGenre } = await this.graphQLClient.playlistsByGenre({
      genreId,
    });

    return playlistsByGenre;
  }

  async getPlaylistsById({ id }: { id: string }) {
    const { playlistById } = await this.graphQLClient.playlistById({
      id,
    });

    return playlistById;
  }
}
