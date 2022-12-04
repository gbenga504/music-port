import type { createContext } from "../framework/createContext";

declare global {
  namespace Express {
    interface Request {
      ctx: ReturnType<typeof createContext>;
    }
  }

  interface Error {
    status?: number;
  }
}
