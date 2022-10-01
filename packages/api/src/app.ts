import express from "express";

import routes from "./routes";
import * as graphql from "./graphql";
import applyContextToRequestMiddleware from "./framework/applyContextToRequestMiddleware";

const app = express();

app.use(applyContextToRequestMiddleware);

app.use("/api/v1", routes);
app.use("/api/v1/graphql", graphql.applyMiddleware());

export default app;
