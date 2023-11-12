import type { GraphQLClient } from "../src/graphql/graphql-client";
import type { AxiosInstance } from "axios";
import type { Db } from "mongodb";

interface ICustomGlobal {
  hasServerStarted: boolean;
  hasDbStarted: boolean;
  restClient: AxiosInstance;
  graphQLClient: GraphQLClient;
  server: any;
  db: Db;
}

const customGlobal: ICustomGlobal = global as any;

export { customGlobal as global };
