import { objectType, queryField, stringArg } from "nexus";

const PlaylistsByGenre = objectType({
  name: "PlaylistsByGenre",
  definition(t) {
    t.field("genre", {
      description: "Genre of the playlist",
      type: "PlaylistGenre",
    });
    t.list.field("items", {
      type: "Playlist",
    });
  },
});

export const playlistsByGenre = queryField("playlistsByGenre", {
  type: PlaylistsByGenre,
  args: {
    genreId: stringArg(),
  },
  async resolve(_parent, args, ctx) {
    const result = await ctx.playlistService.getPlaylistsByGenre({
      genreId: args.genreId,
    });

    return result;
  },
});
