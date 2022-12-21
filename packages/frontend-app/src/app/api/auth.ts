import type { IBaseClientParams } from "./types";

export const auth = ({ httpClientForBackend }: IBaseClientParams) => {
  return {
    authenticateUser: async ({
      platform,
      code,
    }: {
      platform: string;
      code: string;
    }) => {
      const { data } = await httpClientForBackend.get(
        `auth/${platform}/callback`,
        {
          params: {
            code,
          },
        },
      );

      return data;
    },
  };
};
