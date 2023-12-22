import { mutationField, objectType, stringArg } from "nexus";

import { GraphQLError } from "../../graphql/error-handling";

const ConvertPlaylistData = objectType({
  name: "ConvertPlaylistData",
  definition(t) {
    t.string("url");
  },
});

const ConvertPlaylistPayload = objectType({
  name: "ConvertPlaylistPayload",
  definition(t) {
    t.boolean("success");
    t.nullable.field("data", {
      type: ConvertPlaylistData,
    });
    t.nullable.field("error", {
      type: GraphQLError,
    });
  },
});

export const convertPlaylist = mutationField("convertPlaylist", {
  type: ConvertPlaylistPayload,
  args: {
    platform: "PlaylistPlatform",
    playlistExportId: stringArg(),
  },
  authorize(_parent, _args, ctx) {
    return Boolean(ctx.accessToken);
  },
  async resolve(_parent, args, ctx) {
    try {
      const result = await ctx.playlistService.convertPlaylist({
        inputs: {
          platform: args.platform,
          playlistExportId: args.playlistExportId,
        },
        accessToken: ctx.accessToken,
        userId: ctx.userId,
      });

      return { success: true, data: { url: result.url } };
    } catch (error) {
      const { name, message } = error as Error;

      return { success: false, error: { name, message } };
    }
  },
});
