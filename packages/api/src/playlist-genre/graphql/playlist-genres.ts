import { intArg, objectType, queryField } from "nexus";

export const playlistGenres = queryField("playlistGenres", {
  type: objectType({
    name: "PlaylistGenres",
    definition(t) {
      t.int("total");
      t.int("pageSize");
      t.int("currentPage");
      t.list.field("data", {
        type: "PlaylistGenre",
      });
    },
  }),
  args: {
    currentPage: intArg(),
    pageSize: intArg(),
  },
  async resolve(_parent, args, ctx) {
    return ctx.playlistGenreService.getPlaylistGenres({
      currentPage: args.currentPage,
      pageSize: args.pageSize,
    });
  },
});
