import type { Db } from "mongodb";

const MIGRATION_KEY = "create-playlist-genre";

const playlistGenres = [
  {
    name: "K-pop",
    isSystemGenerated: false,
    [MIGRATION_KEY]: true,
  },
  {
    name: "HipPop",
    isSystemGenerated: false,
    [MIGRATION_KEY]: true,
  },
  {
    name: "Others",
    isSystemGenerated: false,
    [MIGRATION_KEY]: true,
  },
  {
    name: "Rap",
    isSystemGenerated: false,
    [MIGRATION_KEY]: true,
  },
  {
    name: "Rock",
    isSystemGenerated: false,
    [MIGRATION_KEY]: true,
  },
  {
    name: "Jazz",
    isSystemGenerated: false,
    [MIGRATION_KEY]: true,
  },
  {
    name: "Blues",
    isSystemGenerated: false,
    [MIGRATION_KEY]: true,
  },
  {
    name: "Classical",
    isSystemGenerated: false,
    [MIGRATION_KEY]: true,
  },
  {
    name: "Country",
    isSystemGenerated: false,
    [MIGRATION_KEY]: true,
  },
  {
    name: "Dance",
    isSystemGenerated: false,
    [MIGRATION_KEY]: true,
  },
  {
    name: "Reggae",
    isSystemGenerated: false,
    [MIGRATION_KEY]: true,
  },
  {
    name: "Drama",
    isSystemGenerated: false,
    [MIGRATION_KEY]: true,
  },
];

export async function up({ context: { db } }: { context: { db: Db } }) {
  await db.collection("playlistgenres").insertMany(playlistGenres);
}

export async function down({ context: { db } }: { context: { db: Db } }) {
  await db
    .collection("playlistgenres")
    .deleteMany({ [MIGRATION_KEY]: { $exists: true } });
}
