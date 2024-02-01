import {
  booleanArg,
  idArg,
  mutationField,
  nullable,
  objectType,
  stringArg,
} from "nexus";

import { GraphQLError } from "../../graphql/error-handling";

const EditPlaylistGenrePayload = objectType({
  name: "EditPlaylistGenrePayload",
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

export const editPlaylistGenre = mutationField("editPlaylistGenre", {
  type: EditPlaylistGenrePayload,
  args: {
    id: idArg(),
    name: nullable(stringArg()),
    isSystemGenerated: nullable(booleanArg()),
  },
  async resolve(_parent, args, ctx) {
    try {
      const result = await ctx.playlistGenreService.editPlaylistGenre({
        inputs: args,
      });

      return { success: true, data: result };
    } catch (error) {
      const { name, message } = error as Error;

      return { success: false, error: { name, message } };
    }
  },
});
