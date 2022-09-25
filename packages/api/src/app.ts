import express from "express";

import * as graphql from "./graphql";

const app = express();
const router = express.Router();

router.get("/debug", function (_req, res) {
  res.send("OK");
});

app.use("/api/v1", router);
app.use("/api/v1/graphql", graphql.applyMiddleware());

export default app;
