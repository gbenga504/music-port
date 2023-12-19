import { enumType, mutationField, objectType, stringArg } from "nexus";

import { GraphQLError } from "../../graphql/error-handling";
import { PlatformValues, PlaylistGenreValues } from "../../utils/platform";

const CreatePlaylistPayload = objectType({
  name: "CreatePlaylistPayload",
  definition(t) {
    t.boolean("success");
    t.nullable.field("data", {
      type: "Playlist",
    });
    t.nullable.field("error", {
      type: GraphQLError,
    });
  },
});

export const createPlaylist = mutationField("createPlaylist", {
  type: CreatePlaylistPayload,
  args: {
    author: stringArg(),
    playlistLink: stringArg(),
    playlistGenre: enumType({
      name: "CreatePlaylistPlaylistGenre",
      members: PlaylistGenreValues,
    }),
    platform: enumType({
      name: "CreatePlaylistPlatform",
      members: PlatformValues,
    }),
  },
  authorize(_parent, _args, ctx) {
    return Boolean(ctx.accessToken);
  },
  async resolve(_parent, args, ctx) {
    try {
      const result = await ctx.playlistService.createPlaylist({
        inputs: args,
        accessToken: ctx.accessToken,
      });

      return { success: true, data: result };
    } catch (error) {
      const { name, message } = error as Error;

      return { success: false, error: { name, message } };
    }
  },
});
