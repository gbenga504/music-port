import { spawn } from "child_process";
import path from "node:path";
import dotenv from "dotenv";
import fs from "node:fs";
import waitOn from "wait-on";

const backendEnvs = dotenv.parse(
  fs.readFileSync(path.join(__dirname, "../..", "api/.test.env")),
);
const frontendEnvs = dotenv.parse(
  fs.readFileSync(path.join(__dirname, "..", ".test.env")),
);

const backendServerPath = path.resolve(__dirname, "../..", "api/src/server.ts");
const frontendServerPath = path.resolve(
  __dirname,
  "..",
  "dist/server/index.js",
);

function startBackendServer(): Promise<NodeJS.Process> {
  const api = spawn(
    "node",
    ["-r", "ts-node/register/transpile-only", backendServerPath],
    { env: { ...process.env, ...backendEnvs } },
  );

  api.stdout.pipe(process.stdout);
  api.stderr.pipe(process.stderr);

  return new Promise((resolve, reject) => {
    waitOn(
      {
        resources: [`tcp:localhost:${backendEnvs.NODE_LOCAL_PORT}`],
        timeout: 45000,
        interval: 10,
      },
      (error: unknown) =>
        error ? reject(error) : resolve(api as unknown as NodeJS.Process),
    );
  });
}

function startFrontendServer(): Promise<NodeJS.Process> {
  const frontend = spawn("node", [frontendServerPath], {
    env: { ...process.env, ...frontendEnvs },
  });

  frontend.stdout.pipe(process.stdout);
  frontend.stderr.pipe(process.stderr);

  return new Promise((resolve, reject) => {
    waitOn(
      {
        resources: [`tcp:localhost:${frontendEnvs.PORT}`],
        timeout: 45000,
        interval: 10,
      },
      (error: unknown) =>
        error ? reject(error) : resolve(frontend as unknown as NodeJS.Process),
    );
  });
}

async function startSever() {
  return Promise.all([startBackendServer(), startFrontendServer()]).then(
    ([backendServerProcess, frontendServerProcess]) => {
      process.on("exit", function () {
        frontendServerProcess.kill(0);
        backendServerProcess.kill(0);
      });
    },
  );
}

startSever();
