import { queryField, list, objectType } from "nexus";

const FeaturedPlaylist = objectType({
  name: "FeaturedPlaylist",
  definition(t) {
    t.field("genre", {
      description: "Genre of the playlist",
      type: "PlaylistGenre",
    });
    t.nonNull.field("items", {
      type: list("Playlist"),
    });
  },
});

export const featuredPlaylists = queryField("featuredPlaylists", {
  type: list(FeaturedPlaylist),
  async resolve(_parent, _args, ctx) {
    const result = await ctx.playlistService.getFeaturedPlaylists();

    return result;
  },
});
