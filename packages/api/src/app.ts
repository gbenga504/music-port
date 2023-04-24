import express from "express";
import cookieParser from "cookie-parser";

import routes from "./routes";
import * as graphql from "./graphql";
import applyContextToRequestMiddleware from "./framework/apply-context-to-request-middleware";

const app = express();

app.use(cookieParser());
app.use(applyContextToRequestMiddleware);

app.use("/api/v1", routes);
app.use("/api/v1/graphql", graphql.applyMiddleware());

export default app;
