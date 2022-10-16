import * as dotenv from "dotenv";
import express from "express";

import { renderer } from "../app/server";

dotenv.config();

const app = express();

app.use("/public", express.static("dist/public"));

app.get("*", (req, res) => {
  res.send(renderer(req, res));
});

app.listen(process.env.PORT, function () {
  console.log(`Frontend app is listening on port:  ${process.env.PORT}
    Frontend base URL:     http://localhost:${process.env.PORT}
    GraphQL base URL: http://localhost:${process.env.PORT}/api/v1/graphql
  `);
});
