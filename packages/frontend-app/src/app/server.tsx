import path from "path";
import React from "react";
import { Request, Response } from "express";
import { renderToString } from "react-dom/server";
import { ChunkExtractor } from "@loadable/server";

import App from "./App";

export const renderer = (_req: Request, _res: Response): string => {
  const statsFile = path.resolve(__dirname, "../../dist/public/stats.json");
  const chunkExtractor = new ChunkExtractor({ statsFile });

  const jsx = chunkExtractor.collectChunks(<App />);
  const jsxHTML = renderToString(jsx);

  return `
    <html>
      <head>
        <title>Music port app</title>
      </head>
      <body>
        <div id="root">${jsxHTML}</div>
        ${chunkExtractor.getScriptTags()}
      </body>
    </html>
  `;
};
