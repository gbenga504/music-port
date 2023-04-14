import type { IBaseClientParams } from "./types";

export class Playlist {
  private graphQLClient: IBaseClientParams["graphQLClient"];

  constructor({ graphQLClient }: IBaseClientParams) {
    this.graphQLClient = graphQLClient;
  }

  async convertPlaylistUsingAdminAuthToken({
    fromPlatform,
    toPlatform,
    link,
  }: {
    fromPlatform: string;
    toPlatform: string;
    link: string;
  }) {
    const { convertPlaylistUsingAdminAuthToken } =
      await this.graphQLClient.convertPlaylistUsingAdminAuthToken({
        fromPlatform,
        toPlatform,
        link,
      });

    return convertPlaylistUsingAdminAuthToken;
  }

  async createPlaylist({
    author,
    playlistTitle,
    playlistLink,
    playlistGenre,
    platform,
  }: {
    author: string;
    playlistTitle: string;
    playlistLink: string;
    playlistGenre: string;
    platform: string;
  }) {
    const { createPlaylist } = await this.graphQLClient.createPlaylist({
      author,
      playlistTitle,
      playlistLink,
      playlistGenre,
      platform,
    });

    return createPlaylist;
  }
}
