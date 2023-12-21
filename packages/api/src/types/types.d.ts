import type { createContext } from "../framework/create-context";

declare global {
  namespace Express {
    interface Request {
      ctx: ReturnType<typeof createContext> & {
        accessToken: string;
        userId: string;
      };
    }
  }

  interface Error {
    status?: number;
  }
}

export type ObjectValues<T> = T[keyof T];
