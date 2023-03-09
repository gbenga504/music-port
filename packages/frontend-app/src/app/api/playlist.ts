import type { IBaseClientParams } from "./types";

export class Playlist {
  private graphQLClient: IBaseClientParams["graphQLClient"];

  constructor({ graphQLClient }: IBaseClientParams) {
    this.graphQLClient = graphQLClient;
  }

  async importPlaylist({ importLink }: { importLink: string }) {
    const { importPlaylist } = await this.graphQLClient.importPlaylist({
      link: importLink,
    });

    return importPlaylist;
  }

  async getPlaylistByExportId({ exportId }: { exportId: string }) {
    const { playlistByExportId } =
      await this.graphQLClient.getPlaylistByExportId({
        exportId,
      });

    return playlistByExportId;
  }

  async exportPlaylist({
    platform,
    exportId,
  }: {
    platform: string;
    exportId: string;
  }) {
    const { exportPlaylist } = await this.graphQLClient.exportPlaylist({
      exportId,
      platform,
    });

    return exportPlaylist;
  }
}
