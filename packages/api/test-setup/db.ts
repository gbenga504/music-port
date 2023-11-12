import mongoose from "mongoose";

import { global } from "./test-globals";

import type { Db } from "mongodb";


const initDatabase = async () => {
  return new Promise((resolve) => {
    mongoose.connect(process.env.MONGODB_URI!);
    const database = mongoose.connection;

    database.on("error", function (error) {
      throw new Error(`Couldn't start the database: ${error}`);
    });

    database.on("connected", function () {
      console.log("Database connected");

      global.db = database.db as unknown as Db;
      resolve("Database connected");
    });
  });
};

const resetDatabase = async () => {
  const collections = await global.db.collections();

  return Promise.all(
    collections.map(({ collectionName }) =>
      global.db.collection(collectionName).deleteMany({}),
    ),
  );
};

const disconnectDatabase = async () => {
  await resetDatabase();
  await mongoose.disconnect();
};

export function init() {
  beforeAll(async () => {
    if (global.hasDbStarted) {
      throw new Error(
        "The db can only be started once. Please make sure the db helper is only called once",
      );
    }

    await initDatabase();
    global.hasDbStarted = true;
  });

  afterEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });
}
