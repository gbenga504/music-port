#!/usr/bin/env node
import path from "node:path";

import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { Umzug, MongoDBStorage } from "umzug";

const args = process.argv.slice(2);
const command = args[0];
const environment = args[1];
const nameOfMigration: string | undefined = args[2];

const envs = {
  "--dev": path.join(__dirname, "../.dev.env"),
  "--prod": path.join(__dirname, "../.prod.env"),
};

if (environment in envs === false) {
  console.log(`
    You must pass the environment this migration runs in

    E.g yarn migration:run --dev [NAME_OF_MIGRATION]    
`);

  process.exit(1);
}

dotenv.config({
  path: envs[environment],
});

const mongoClient = new MongoClient(process.env.MONDODB_URI_LOCAL!);

mongoClient
  .connect()
  .then(async (client) => {
    const db = client.db();

    const umzug = new Umzug({
      migrations: { glob: path.join(__dirname, "../migrations/*.ts") },
      logger: console,
      storage: new MongoDBStorage({
        connection: db,
        collectionName: "migrations",
      }),
      context: { db },
    });

    switch (command) {
      case "--run":
        await umzug.up({ to: nameOfMigration });
        break;
      case "--revert":
        // Here we either revert the migration if the name is specified, otherwise we revert the last applied migration
        await umzug.down({ to: nameOfMigration });
        break;
      default:
        console.log(
          "You must provide a provide a command. Please use --run or --revert",
        );
        closeDb();
        process.exit(1);
    }

    await closeDb();
    console.log("Db closed!");
  })
  .catch((error) => {
    closeDb();
    console.log("An error occured", error);
  });

async function closeDb() {
  await mongoClient.close();
}
