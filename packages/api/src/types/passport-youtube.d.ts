declare module "passport-youtube-v3" {
  import type { Request } from "express";

  type VerifyCallback = (
    error?: Error | null,
    opts: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number | null;
      userId: string;
    },
  ) => void;

  export interface StrategyOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope?: string[];
  }

  type VerifyFunction = (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) => void;

  export class Strategy {
    constructor(options: StrategyOptions, verify: VerifyFunction);

    authenticate(req: Request, options?: object): void;
  }
}
