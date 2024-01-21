import { booleanArg, mutationField, objectType, stringArg } from "nexus";

import { GraphQLError } from "../../graphql/error-handling";

const CreatePlaylistGenrePayload = objectType({
  name: "CreatePlaylistGenrePayload",
  definition(t) {
    t.boolean("success");
    t.nullable.field("data", {
      type: "PlaylistGenre",
    });
    t.nullable.field("error", {
      type: GraphQLError,
    });
  },
});

export const createPlaylistGenre = mutationField("createPlaylistGenre", {
  type: CreatePlaylistGenrePayload,
  args: {
    name: stringArg(),
    isSystemGenerated: booleanArg(),
  },
  async resolve(_parent, args, ctx) {
    try {
      const result = await ctx.playlistGenreService.createPlaylistGenre({
        inputs: args,
      });

      return { success: true, data: result };
    } catch (error) {
      const { name, message } = error as Error;

      return { success: false, error: { name, message } };
    }
  },
});
