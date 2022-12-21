import { gql } from "../../utils/gql";
import type { IBaseClientParams } from "./types";

export const playlist = ({ httpClientForBackend }: IBaseClientParams) => {
  return {
    importPlaylist: async ({
      importLink,
    }: {
      importLink: string;
    }): Promise<any> => {
      const {
        data: {
          data: { importPlaylist },
        },
      } = await httpClientForBackend.post("/graphql", {
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
    },
  };
};
