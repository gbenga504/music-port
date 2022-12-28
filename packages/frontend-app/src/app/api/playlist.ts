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
}
