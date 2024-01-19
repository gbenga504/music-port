import path from "node:path";

import { idArg, nullable, objectType, queryField } from "nexus";

const PlaylistGenre = objectType({
  name: "PlaylistGenre",
  sourceType: {
    module: path.join(__dirname, "../../models"),
    export: "IPlaylistGenre",
  },
  definition(t) {
    t.string("id", {
      resolve(parent) {
        return parent._id.toString();
      },
    });
    t.string("name", { description: "Name of the Genre" });
    t.boolean("isSystemGenerated", {
      description:
        "Tells if the genre should contain only playlist created by the system or those created by users",
    });
  },
});

export const playlistGenreById = queryField("playlistGenreById", {
  type: nullable(PlaylistGenre),
  args: {
    id: idArg(),
  },
  async resolve(_parent, args, ctx) {
    const result = await ctx.playlistGenreService.getById({ id: args.id });

    return result;
  },
});
