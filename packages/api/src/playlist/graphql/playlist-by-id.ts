import path from "node:path";

import { enumType, idArg, nullable, objectType, queryField } from "nexus";

import { PlatformValues, PlaylistGenreValues } from "../../utils/platform";

const PlaylistImage = objectType({
  name: "PlaylistImage",
  definition(t) {
    t.string("url");
    t.nullable.int("width");
    t.nullable.int("height");
  },
});

const PlaylistOwner = objectType({
  name: "PlaylistOwner",
  definition(t) {
    t.string("name");
  },
});

const PlaylistSongArtist = objectType({
  name: "PlaylistSongArtist",
  definition(t) {
    t.string("name");
  },
});

const PlaylistSong = objectType({
  name: "PlaylistSong",
  definition(t) {
    t.list.field("artists", {
      type: PlaylistSongArtist,
      description: "Artists who were involved in the song",
    });
    t.list.field("images", {
      type: PlaylistImage,
      description: "Images associated with the song",
    });
    t.string("name", { description: "Name of the song" });
    t.nullable.string("previewURL", {
      description: "URL to preview the song",
    });
    t.int("duration");
    t.nullable.string("coverImage", {
      resolve(parent) {
        const coverImage = parent.images.reduce((acc, image) => {
          if (image.width! > acc.width! || image.height! > acc.height!) {
            acc = image;
          }

          return acc;
        }, parent.images[0]);

        return coverImage?.url ?? null;
      },
    });
  },
});

const Playlist = objectType({
  name: "Playlist",
  sourceType: {
    module: path.join(__dirname, "../models"),
    export: "IPlaylist",
  },
  definition(t) {
    t.string("id", {
      resolve(parent) {
        return parent._id.toString();
      },
    });
    t.string("importLink", { description: "Link used to import playlist" });
    t.boolean("public", { description: "If the playlist is public or not" });
    t.field("platform", {
      description: "The platform for this playlist",
      type: enumType({
        name: "PlaylistPlatform",
        members: PlatformValues,
      }),
    });
    t.string("importPlaylistId", {
      description: "Playlist Id used on the music streaming platform",
    });
    t.string("exportId", { description: "Unique Id used to export playlist" });
    t.list.field("images", {
      type: PlaylistImage,
      description: "Images for the playlist",
    });
    t.string("apiLink", {
      description: "Api link to the playlist on the music streaming platform",
    });
    t.string("name", { description: "Name of the playlist" });
    t.field("genre", {
      description: "Genre of the playlist",
      type: enumType({
        name: "PlaylistGenre",
        members: PlaylistGenreValues,
      }),
    });
    t.field("owner", {
      type: PlaylistOwner,
      description: "Owner profile of the playlist",
    });
    t.list.field("songs", {
      type: PlaylistSong,
      description: "Songs associated with the playlist",
    });
    t.int("totalNumberOfSongs", {
      resolve(parent) {
        return parent.songs.length;
      },
    });
    t.int("duration");
    t.string("coverImage", {
      resolve(parent) {
        const coverImage = parent.images.reduce((acc, image) => {
          if (image.width! > acc.width! || image.height! > acc.height!) {
            acc = image;
          }

          return acc;
        }, parent.images[0]);

        return coverImage.url;
      },
    });
  },
});

export const playlistById = queryField("playlistById", {
  type: nullable(Playlist),
  args: {
    id: idArg(),
  },
  async resolve(_parent, args, ctx) {
    const result = await ctx.playlistService.getById({ id: args.id });

    return result;
  },
});
