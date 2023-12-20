import { intArg, objectType, queryField, stringArg } from "nexus";

export const PlaylistSongs = queryField("playlistSongs", {
  type: objectType({
    name: "PlaylistSongLists",
    definition(t) {
      t.int("total");
      t.int("pageSize");
      t.int("currentPage");
      t.list.field("data", {
        type: "PlaylistSong",
      });
    },
  }),
  args: {
    playlistId: stringArg(),
    currentPage: intArg(),
    pageSize: intArg(),
  },
  async resolve(_parent, args, ctx) {
    return ctx.playlistService.getPlaylistSongs({
      playlistId: args.playlistId,
      currentPage: args.currentPage,
      pageSize: args.pageSize,
    });
  },
});
