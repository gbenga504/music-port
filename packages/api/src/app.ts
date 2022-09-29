import express from "express";

import * as graphql from "./graphql";
import applyContextToRequestMiddleware from "./framework/applyContextToRequestMiddleware";

const app = express();
const router = express.Router();

app.use(applyContextToRequestMiddleware);

router.get("/debug", function (_req, res) {
  res.send("OK");
});

app.use("/api/v1", router);
app.use("/api/v1/graphql", graphql.applyMiddleware());

export default app;
