import { gql } from "../../utils/gql";
import type { IBaseClientParams } from "./types";

export class Playlist {
  private httpClientForBackend: IBaseClientParams["httpClientForBackend"];

  constructor({ httpClientForBackend }: IBaseClientParams) {
    this.httpClientForBackend = httpClientForBackend;
  }

  async importPlaylist({ importLink }: { importLink: string }): Promise<any> {
    const {
      data: {
        data: { importPlaylist },
      },
    } = await this.httpClientForBackend.post("/graphql", {
      query: gql`
        mutation importPlaylist($link: String!) {
          importPlaylist(link: $link) {
            success
            error {
              name
              message
            }
            data {
              exportId
            }
          }
        }
      `,
      variables: {
        link: importLink,
      },
    });

    return importPlaylist;
  }

  async getPlaylistByExportId({
    exportId,
  }: {
    exportId: string;
  }): Promise<any> {
    const {
      data: {
        data: { playlistByExportId },
      },
    } = await this.httpClientForBackend.post("/graphql", {
      query: gql`
        query getPlaylistByExportId($exportId: String!) {
          playlistByExportId(exportId: $exportId) {
            id
            exportId
            images {
              url
              width
              height
            }
            name
            owner {
              name
            }
            songs {
              name
            }
          }
        }
      `,
      variables: {
        exportId,
      },
    });

    return playlistByExportId;
  }

  async exportPlaylist({
    platform,
    exportId,
  }: {
    platform: string;
    exportId: string;
  }): Promise<any> {
    const {
      data: {
        data: { exportPlaylist },
      },
    } = await this.httpClientForBackend.post("/graphql", {
      query: gql`
        mutation exportPlaylist($exportId: String!, $platform: String!) {
          exportPlaylist(exportId: $exportId, platform: $platform) {
            success
            data {
              url
            }
            error {
              name
              message
            }
          }
        }
      `,
      variables: {
        exportId,
        platform,
      },
    });

    return exportPlaylist;
  }
}
