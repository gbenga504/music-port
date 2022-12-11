import express from "express";

import routes from "./routes";
import * as graphql from "./graphql";
import applyContextToRequestMiddleware from "./framework/apply-context-to-request-middleware";
import applyAccessTokenToRequestCtxMiddleware from "./framework/apply-access-token-to-request-ctx-middleware";

const app = express();

app.use(applyContextToRequestMiddleware);
app.use(applyAccessTokenToRequestCtxMiddleware);

app.use("/api/v1", routes);
app.use("/api/v1/graphql", graphql.applyMiddleware());

export default app;
