import { intArg, nullable, objectType, queryField } from "nexus";

export const playlists = queryField("playlists", {
  type: objectType({
    name: "Playlists",
    definition(t) {
      t.int("total");
      t.int("pageSize");
      t.int("currentPage");
      t.list.field("data", {
        type: "Playlist",
      });
    },
  }),
  args: {
    genre: nullable("PlaylistGenre"),
    currentPage: intArg(),
    pageSize: intArg(),
  },
  async resolve(_parent, args, ctx) {
    return ctx.playlistService.getPlaylists({
      query: { genre: args.genre },
      currentPage: args.currentPage,
      pageSize: args.pageSize,
    });
  },
});
