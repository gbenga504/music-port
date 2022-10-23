import * as dotenv from "dotenv";
import express from "express";

import { renderer } from "../app/server";
import { createApiClient } from "../app/api";

dotenv.config();

const app = express();

app.use((req, _res, next) => {
  req.api = createApiClient({
    backendApiBaseUrl: process.env.BACKEND_API_BASE_URL,
    frontendApiBaseUrl: process.env.FRONTEND_BASE_URL,
  });

  next();
});

app.use("/public", express.static("dist/public"));

app.get("/*", async (req, res) => {
  try {
    if (req.url === "/favicon.ico") {
      return res.status(200).json({ status: "ok" });
    }

    const content = await renderer(req, res);
    return res.status(200).send(content);
  } catch (error) {
    const content = await renderer(req, res, error);
    return res.status(200).send(content);
  }
});

app.listen(process.env.PORT, function () {
  console.log(`Frontend app is listening on port:  ${process.env.PORT}
    Frontend base URL:     http://localhost:${process.env.PORT}
    GraphQL base URL: http://localhost:${process.env.PORT}/api/v1/graphql
  `);
});
