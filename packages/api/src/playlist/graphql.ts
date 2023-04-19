import {
  enumType,
  mutationField,
  intArg,
  nullable,
  objectType,
  queryField,
  stringArg,
  idArg,
} from "nexus";
import path from "path";

import { GraphQLError } from "../graphql/error-handling";
import { PlatformValues, PlaylistGenreValues } from "../utils/platform";

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
    t.nullable.string("coverImage", {
      resolve(parent) {
        const coverImage = parent.images.reduce((acc, image) => {
          if (image.width! > acc.width! || image.height! > acc.height!) {
            acc = image;
          }

          return acc;
        }, parent.images[0]);

        return coverImage.url ?? null;
      },
    });
  },
});

export const Playlists = queryField("playlists", {
  type: objectType({
    name: "PlaylistLists",
    definition(t) {
      t.int("total");
      t.int("pageSize");
      t.int("currentPage");
      t.list.field("data", {
        type: Playlist,
      });
    },
  }),
  args: {
    genre: nullable(stringArg()),
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

export const PlaylistSongs = queryField("playlistSongs", {
  type: objectType({
    name: "PlaylistSongLists",
    definition(t) {
      t.int("total");
      t.int("pageSize");
      t.int("currentPage");
      t.list.field("data", {
        type: PlaylistSong,
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

const CreatePlaylistPayload = objectType({
  name: "CreatePlaylistPayload",
  definition(t) {
    t.boolean("success");
    t.nullable.field("data", {
      type: Playlist,
    });
    t.nullable.field("error", {
      type: GraphQLError,
    });
  },
});

export const createPlaylist = mutationField("createPlaylist", {
  type: CreatePlaylistPayload,
  args: {
    author: stringArg(),
    playlistTitle: stringArg(),
    playlistLink: stringArg(),
    playlistGenre: stringArg(),
    platform: stringArg(),
  },
  authorize(_parent, _args, ctx) {
    return Boolean(ctx.accessToken);
  },
  async resolve(_parent, args, ctx) {
    try {
      const result = await ctx.playlistService.createPlaylist({
        inputs: args,
        accessToken: ctx.accessToken,
      });

      return { success: true, data: result };
    } catch (error) {
      const { name, message } = error as Error;

      return { success: false, error: { name, message } };
    }
  },
});

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

export const convertPlaylistUsingAdminAuthToken = mutationField(
  "convertPlaylistUsingAdminAuthToken",
  {
    type: ConvertPlaylistPayload,
    args: {
      fromPlatform: stringArg(),
      toPlatform: stringArg(),
      link: stringArg(),
    },
    authorize(_parent, _args, ctx) {
      return Boolean(ctx.accessToken);
    },
    async resolve(_parent, args, ctx) {
      try {
        const result =
          await ctx.playlistService.convertPlaylistUsingAdminAuthToken({
            inputs: {
              fromPlatform: args.fromPlatform,
              toPlatform: args.toPlatform,
              link: args.link,
            },
            userAccessToken: ctx.accessToken,
            userId: ctx.userId,
          });

        return { success: true, data: { url: result.url } };
      } catch (error) {
        const { name, message } = error as Error;

        return { success: false, error: { name, message } };
      }
    },
  },
);

export const convertPlaylist = mutationField("convertPlaylist", {
  type: ConvertPlaylistPayload,
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
