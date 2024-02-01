import { idArg, mutationField, objectType } from "nexus";

import { GraphQLError } from "../../graphql/error-handling";

const DeletePlaylist = objectType({
  name: "DeletePlaylist",
  definition(t) {
    t.boolean("success");
    t.nullable.field("error", {
      type: GraphQLError,
    });
  },
});

export const deletePlaylist = mutationField("deletePlaylist", {
  type: DeletePlaylist,
  args: {
    id: idArg(),
  },
  async resolve(_parent, args, ctx) {
    try {
      await ctx.playlistService.deletePlaylist(args.id);

      return { success: true };
    } catch (error) {
      const { name, message } = error as Error;

      return { success: false, error: { name, message } };
    }
  },
});
