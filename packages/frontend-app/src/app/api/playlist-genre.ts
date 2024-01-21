import type { IBaseClientParams } from "./types";

export class PlaylistGenre {
  private graphQLClient: IBaseClientParams["graphQLClient"];

  constructor({ graphQLClient }: IBaseClientParams) {
    this.graphQLClient = graphQLClient;
  }

  async getPlaylistGenres({
    currentPage,
    pageSize,
  }: {
    currentPage: number;
    pageSize: number;
  }) {
    const { playlistGenres } = await this.graphQLClient.playlistGenres({
      currentPage,
      pageSize,
    });

    return playlistGenres;
  }
}
