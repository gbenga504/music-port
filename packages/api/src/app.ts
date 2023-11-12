import cookieParser from "cookie-parser";
import express from "express";

import applyContextToRequestMiddleware from "./framework/apply-context-to-request-middleware";
import * as graphql from "./graphql";
import routes from "./routes";

const app = express();

app.use(cookieParser());
app.use(applyContextToRequestMiddleware);

app.use("/api/v1", routes);
app.use("/api/v1/graphql", graphql.applyMiddleware());

export default app;
