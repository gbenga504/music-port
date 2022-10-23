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
import { loadPageResources } from "./utils/routeUtils";

export const renderer = async (
  req: Request,
  _res: Response,
  error?: Error
): Promise<string> => {
  const statsFile = path.resolve(__dirname, "../../dist/public/stats.json");
  const chunkExtractor = new ChunkExtractor({
    statsFile,
    entrypoints: ["client"],
  });

  const matchedRoutes = matchRoutes(routes, req.url) || [];
  const pageDatas = await loadPageResources(matchedRoutes, false, req.api);

  const data = {
    pageDatas,
    error,
  };

  const jsx = chunkExtractor.collectChunks(
    <StaticRouter location={req.url}>
      <App {...data} api={req.api} />
    </StaticRouter>
  );

  const jsxHTML = renderToString(jsx);
  const helmet = Helmet.renderStatic();

  return `
    <!doctype html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta content="width=device-width,initial-scale=1,user-scalable=no" name="viewport" />
        <meta name="author" content="Anifowoshe Gbenga" />
        <meta property="og:type" content="article" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${helmet.script.toString()}
        ${chunkExtractor.getStyleTags()}
      </head>
      <body>
        <div id="root">${jsxHTML}</div>
        ${chunkExtractor.getScriptTags()}
        <script id="app-data" type="application/json">${serialize(data, {
          isJSON: true,
        })}</script>
      </body>
    </html>
  `;
};
