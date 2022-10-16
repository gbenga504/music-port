import path from "path";
import React from "react";
import { Request, Response } from "express";
import { renderToString } from "react-dom/server";
import { ChunkExtractor } from "@loadable/server";
import { StaticRouter } from "react-router-dom/server";

import App from "./App";

export const renderer = (req: Request, _res: Response): string => {
  const statsFile = path.resolve(__dirname, "../../dist/public/stats.json");
  const chunkExtractor = new ChunkExtractor({ statsFile });

  const jsx = chunkExtractor.collectChunks(
    <StaticRouter location={req.url}>
      <App />
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
      </body>
    </html>
  `;
};
