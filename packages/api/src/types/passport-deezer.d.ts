declare module "passport-deezer" {
  import { Request } from "express";

  type VerifyCallback = (error?: Error | null, user?: object) => void;

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
