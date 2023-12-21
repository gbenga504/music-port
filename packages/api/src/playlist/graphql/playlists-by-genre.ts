import { objectType, queryField } from "nexus";

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
    genre: "PlaylistGenre",
  },
  async resolve(_parent, args, ctx) {
    const result = await ctx.playlistService.getPlaylistsByGenre({
      genre: args.genre,
    });

    return result;
  },
});
