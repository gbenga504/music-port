import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { ChunkExtractor } from "@loadable/server";
import { StaticRouter } from "react-router-dom/server";
import { matchRoutes } from "react-router-dom";
import serialize from "serialize-javascript";
import { Helmet } from "react-helmet";

import type { Request, Response } from "express";

import App from "./App";
import routes from "./routes";
import { loadPageResources } from "../utils/route-utils";
import { RedirectError } from "../errors/redirect-error";
import { ErrorBoundary } from "./ErrorBoundary";

export const renderer = async (
  req: Request,
  res: Response,
  error?: Error
): Promise<{ status: number; content: string } | void> => {
  // If a redirection error is received, then we want to perform
  // the redirecion very early in the process
  if (error instanceof RedirectError) {
    return res.redirect(error.status, error.url);
  }

  const statsFile = path.resolve(__dirname, "../../dist/public/stats.json");
  const chunkExtractor = new ChunkExtractor({
    statsFile,
    entrypoints: ["client"],
  });

  let pageDatas = {};

  if (!error) {
    const matchedRoutes = matchRoutes(routes, req.url);
    pageDatas = await loadPageResources({
      matchedRoutes,
      api: req.api,
      query: req.query as { [key: string]: string },
    });
  }

  const data = {
    pageDatas,
    error,
  };

  const jsx = chunkExtractor.collectChunks(
    <StaticRouter location={req.url}>
      <ErrorBoundary error={error}>
        <App {...data} api={req.api} />
      </ErrorBoundary>
    </StaticRouter>
  );

  const jsxHTML = renderToString(jsx);
  const helmet = Helmet.renderStatic();

  const content = `
    <!doctype html>
      <html lang="en" style="height: 100%; color: white">
      <head>
        <meta charset="utf-8">
        <meta content="width=device-width,initial-scale=1,user-scalable=no" name="viewport" />
        <meta name="author" content="Anifowoshe Gbenga" />
        <meta property="og:type" content="article" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="icon" type="image/x-icon" href="public/images/logo.svg">
        <style>
          * {
            font-family: -apple-system,BlinkMacSystemFont,Apple Color Emoji,SF Pro,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif
          }
        </style>

        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${helmet.script.toString()}
        ${chunkExtractor.getStyleTags()}
      </head>
      <body style="height: 100%; overflow-x: hidden; background: #1F1F1F">
        <div style="height: 100%" id="root">${jsxHTML}</div>
        ${chunkExtractor.getScriptTags()}
        <script id="app-data" type="application/json">${serialize(data, {
          isJSON: true,
        })}</script>
      </body>
    </html>
  `;

  let status = 200;

  if (error) {
    console.error(
      `------------------- Server error --------------------------`
    );
    console.error(error.stack);
    console.error("Network status ===>  ", error.status || 500);

    status = error.status || 500;
  }

  return { content, status };
};
