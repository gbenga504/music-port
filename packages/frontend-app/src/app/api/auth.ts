import type { IBaseClientParams } from "./types";

export class Auth {
  private httpClientForBackend: IBaseClientParams["httpClientForBackend"];

  constructor({ httpClientForBackend }: IBaseClientParams) {
    this.httpClientForBackend = httpClientForBackend;
  }

  async authenticateUser({
    platform,
    code,
    fromAdminAuthTokenGenerator,
  }: {
    platform: string;
    code: string;
    fromAdminAuthTokenGenerator: boolean;
  }): Promise<any> {
    const { data } = await this.httpClientForBackend.get(
      `auth/${platform}/callback`,
      {
        params: {
          code,
          fromAdminAuthTokenGenerator,
        },
      },
    );

    return data;
  }
}
