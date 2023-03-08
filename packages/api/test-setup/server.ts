import defer from "p-defer";
import axios from "axios";

import app from "../src/app";
import { global } from "./test-globals";
import { createGraphQLClient } from "../src/graphql/graphql-client";
import * as dbHelpers from "./db";

const createRestClient = ({ url }: { url: string }) => {
  return axios.create({
    baseURL: url,
  });
};

export function init() {
  dbHelpers.init();

  beforeAll(async () => {
    if (global.hasServerStarted) {
      throw new Error(
        "The server can only be started once. Please make sure the server helper is only called once",
      );
    }

    const deferredServer = defer();

    global.server = app.listen(function () {
      deferredServer.resolve();
    });

    await deferredServer.promise;

    const address = global.server.address();

    if (!address) {
      throw new Error("Server isn't listening on any ports");
    }

    if (typeof address !== "object") {
      throw new Error("Server isn't listening properly on a socket");
    }

    const port = address.port;

    global.restClient = createRestClient({
      url: `http://localhost:${port}/api/v1`,
    });

    global.graphQLClient = createGraphQLClient({
      url: `http://localhost:${port}/api/v1/graphql`,
    });

    global.hasServerStarted = true;
  });

  afterAll(async () => {
    await global.server.close();
  });
}
