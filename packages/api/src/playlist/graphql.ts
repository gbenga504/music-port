import {
  enumType,
  idArg,
  mutationField,
  nullable,
  objectType,
  queryField,
  stringArg,
} from "nexus";
import path from "path";

import { GraphQLError } from "../graphql/error-handling";

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
    t.string("name", { description: "Name of the song" }),
      t.nullable.string("previewURL", {
        description: "URL to preview the song",
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
        members: ["deezer", "spotify"],
        description: "The platform for this playlist",
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
    t.field("owner", {
      type: PlaylistOwner,
      description: "Owner profile of the playlist",
    });
    t.list.field("songs", {
      type: PlaylistSong,
      description: "Songs associated with the playlist",
    });
  },
});

const ImportPlaylistPayload = objectType({
  name: "ImportPlaylistPayload",
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

export const importPlaylist = mutationField("importPlaylist", {
  type: ImportPlaylistPayload,
  args: {
    link: stringArg(),
  },
  authorize(_parent, _args, ctx) {
    return Boolean(ctx.accessToken);
  },
  async resolve(_parent, args, ctx) {
    try {
      const result = await ctx.playlistService.importPlaylist({
        accessToken: ctx.accessToken,
        link: args.link,
      });

      return { success: true, data: result };
    } catch (error) {
      const { name, message } = error as Error;

      return { success: false, error: { name, message } };
    }
  },
});

const ExportPlaylistPayloadData = objectType({
  name: "ExportPlaylistPayloadData",
  definition(t) {
    t.string("url");
  },
});

const ExportPlaylistPayload = objectType({
  name: "ExportPlaylistPayload",
  definition(t) {
    t.boolean("success");
    t.nullable.field("data", {
      type: ExportPlaylistPayloadData,
    });
    t.nullable.field("error", {
      type: GraphQLError,
    });
  },
});

export const exportPlaylist = mutationField("exportPlaylist", {
  type: ExportPlaylistPayload,
  args: {
    platform: stringArg(),
    exportId: stringArg(),
  },
  authorize(_parent, _args, ctx) {
    return Boolean(ctx.accessToken);
  },
  async resolve(_parent, args, ctx) {
    try {
      const result = await ctx.playlistService.exportPlaylist({
        accessToken: ctx.accessToken,
        exportId: args.exportId,
        userId: ctx.userId,
        platform: args.platform,
      });

      return { success: true, data: { url: result.url } };
    } catch (error) {
      const { name, message } = error as Error;

      return { success: false, error: { name, message } };
    }
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

export const playlistByExportId = queryField("playlistByExportId", {
  type: nullable(Playlist),
  args: {
    exportId: stringArg(),
  },
  async resolve(_parent, args, ctx) {
    const result = await ctx.playlistService.getByExportId({
      exportId: args.exportId,
    });

    return result;
  },
});
