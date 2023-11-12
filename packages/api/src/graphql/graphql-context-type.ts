import type { createContext } from "../framework/create-context";

export type GraphQLContextType = ReturnType<typeof createContext> & {
  accessToken: string;
  userId: string;
};
