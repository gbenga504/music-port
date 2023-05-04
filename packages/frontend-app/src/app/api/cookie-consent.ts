import type { IBaseClientParams } from "./types";

export class CookieConsent {
  private httpClientForFrontend: IBaseClientParams["httpClientForFrontend"];

  constructor({ httpClientForFrontend }: IBaseClientParams) {
    this.httpClientForFrontend = httpClientForFrontend;
  }

  async cookieConsent(): Promise<Record<string, boolean>> {
    const { data } = await this.httpClientForFrontend.post(`/cookie-consent`);

    return data;
  }
}
