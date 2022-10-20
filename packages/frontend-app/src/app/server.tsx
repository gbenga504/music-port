import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { ChunkExtractor } from "@loadable/server";
import { StaticRouter } from "react-router-dom/server";
import { matchRoutes } from "react-router-dom";
import serialize from "serialize-javascript";

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
  const pageDatas = await loadPageResources(matchedRoutes);

  const data = {
    pageDatas,
    error,
  };

  const jsx = chunkExtractor.collectChunks(
    <StaticRouter location={req.url}>
      <App {...data} />
    </StaticRouter>
  );

  const jsxHTML = renderToString(jsx);

  return `
    <!doctype html>
      <head>
        <title>Music port</title>
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
