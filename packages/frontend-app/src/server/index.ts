import express from "express";
import cookieParser from "cookie-parser";
import { createProxyMiddleware } from "http-proxy-middleware";

import { renderer } from "../app/server";
import authRoutes from "./auth-routes";
import tokenGeneratorRoutes from "./token-generator-routes";
import { getApiClient } from "../app/api";

const app = express();

app.use((req, _res, next) => {
  req.api = getApiClient();

  next();
});

app.use("/public", express.static("dist/public"));
app.use(cookieParser());

app.use(authRoutes);
app.use(tokenGeneratorRoutes);

app.use(
  "/api",
  createProxyMiddleware({
    target: process.env.BACKEND_API_BASE_URL!,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/",
    },
  }),
);

app.get("/*", async (req, res) => {
  try {
    if (req.url === "/favicon.ico") {
      return res.status(200).json({ status: "ok" });
    }

    const { content, status } = await renderer(req, res);
    return res.status(status).send(content);
  } catch (error) {
    const { content, status } = await renderer(req, res, error as Error);
    return res.status(status).send(content);
  }
});

app.listen(process.env.PORT, function () {
  console.log(`Frontend app is listening on port:  ${process.env.PORT}
    Frontend base URL:     http://localhost:${process.env.PORT}
    GraphQL base URL: http://localhost:${process.env.PORT}/api/graphql
  `);
});
