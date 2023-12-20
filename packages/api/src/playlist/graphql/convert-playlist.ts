import { mutationField, stringArg } from "nexus";

export const convertPlaylist = mutationField("convertPlaylist", {
  type: "ConvertPlaylistPayload",
  args: {
    platform: stringArg(),
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
