// @ts-nocheck

import type { GraphQLContextType } from "./graphql-context-type";
import type { IPlaylist } from "./../models";
import type { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin";
import type { core, connectionPluginCore } from "nexus";

declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName>
    ): void;
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {}

export interface NexusGenEnums {
  PlaylistGenre:
    | "Afro"
    | "Blues"
    | "Classical"
    | "Country"
    | "Dance"
    | "HipPop"
    | "Jazz"
    | "KPop"
    | "Others"
    | "Rap"
    | "Reggae"
    | "Rock";
  PlaylistPlatform: "deezer" | "spotify" | "youtubeMusic";
}

export interface NexusGenScalars {
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenObjects {
  ConvertPlaylistData: {
    // root type
    url: string; // String!
  };
  ConvertPlaylistPayload: {
    // root type
    data?: NexusGenRootTypes["ConvertPlaylistData"] | null; // ConvertPlaylistData
    error?: NexusGenRootTypes["PlaylistError"] | null; // PlaylistError
    success: boolean; // Boolean!
  };
  CreatePlaylistPayload: {
    // root type
    data?: NexusGenRootTypes["Playlist"] | null; // Playlist
    error?: NexusGenRootTypes["PlaylistError"] | null; // PlaylistError
    success: boolean; // Boolean!
  };
  FeaturedPlaylist: {
    // root type
    genre: NexusGenEnums["PlaylistGenre"]; // PlaylistGenre!
    items: NexusGenRootTypes["Playlist"][]; // [Playlist!]!
  };
  Mutation: {};
  Playlist: IPlaylist;
  PlaylistError: {
    // root type
    message: string; // String!
    name: string; // String!
  };
  PlaylistImage: {
    // root type
    height?: number | null; // Int
    url: string; // String!
    width?: number | null; // Int
  };
  PlaylistOwner: {
    // root type
    name: string; // String!
  };
  PlaylistSong: {
    // root type
    artists: NexusGenRootTypes["PlaylistSongArtist"][]; // [PlaylistSongArtist!]!
    duration: number; // Int!
    images: NexusGenRootTypes["PlaylistImage"][]; // [PlaylistImage!]!
    name: string; // String!
    previewURL?: string | null; // String
  };
  PlaylistSongArtist: {
    // root type
    name: string; // String!
  };
  PlaylistSongLists: {
    // root type
    currentPage: number; // Int!
    data: NexusGenRootTypes["PlaylistSong"][]; // [PlaylistSong!]!
    pageSize: number; // Int!
    total: number; // Int!
  };
  Playlists: {
    // root type
    currentPage: number; // Int!
    data: NexusGenRootTypes["Playlist"][]; // [Playlist!]!
    pageSize: number; // Int!
    total: number; // Int!
  };
  PlaylistsByGenre: {
    // root type
    genre: NexusGenEnums["PlaylistGenre"]; // PlaylistGenre!
    items: NexusGenRootTypes["Playlist"][]; // [Playlist!]!
  };
  Query: {};
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects;

export type NexusGenAllTypes = NexusGenRootTypes &
  NexusGenScalars &
  NexusGenEnums;

export interface NexusGenFieldTypes {
  ConvertPlaylistData: {
    // field return type
    url: string; // String!
  };
  ConvertPlaylistPayload: {
    // field return type
    data: NexusGenRootTypes["ConvertPlaylistData"] | null; // ConvertPlaylistData
    error: NexusGenRootTypes["PlaylistError"] | null; // PlaylistError
    success: boolean; // Boolean!
  };
  CreatePlaylistPayload: {
    // field return type
    data: NexusGenRootTypes["Playlist"] | null; // Playlist
    error: NexusGenRootTypes["PlaylistError"] | null; // PlaylistError
    success: boolean; // Boolean!
  };
  FeaturedPlaylist: {
    // field return type
    genre: NexusGenEnums["PlaylistGenre"]; // PlaylistGenre!
    items: NexusGenRootTypes["Playlist"][]; // [Playlist!]!
  };
  Mutation: {
    // field return type
    convertPlaylist: NexusGenRootTypes["ConvertPlaylistPayload"]; // ConvertPlaylistPayload!
    createPlaylist: NexusGenRootTypes["CreatePlaylistPayload"]; // CreatePlaylistPayload!
  };
  Playlist: {
    // field return type
    apiLink: string; // String!
    coverImage: string; // String!
    duration: number; // Int!
    exportId: string; // String!
    genre: NexusGenEnums["PlaylistGenre"]; // PlaylistGenre!
    id: string; // String!
    images: NexusGenRootTypes["PlaylistImage"][]; // [PlaylistImage!]!
    importLink: string; // String!
    importPlaylistId: string; // String!
    name: string; // String!
    owner: NexusGenRootTypes["PlaylistOwner"]; // PlaylistOwner!
    platform: NexusGenEnums["PlaylistPlatform"]; // PlaylistPlatform!
    public: boolean; // Boolean!
    songs: NexusGenRootTypes["PlaylistSong"][]; // [PlaylistSong!]!
    totalNumberOfSongs: number; // Int!
  };
  PlaylistError: {
    // field return type
    message: string; // String!
    name: string; // String!
  };
  PlaylistImage: {
    // field return type
    height: number | null; // Int
    url: string; // String!
    width: number | null; // Int
  };
  PlaylistOwner: {
    // field return type
    name: string; // String!
  };
  PlaylistSong: {
    // field return type
    artists: NexusGenRootTypes["PlaylistSongArtist"][]; // [PlaylistSongArtist!]!
    coverImage: string; // String!
    duration: number; // Int!
    images: NexusGenRootTypes["PlaylistImage"][]; // [PlaylistImage!]!
    name: string; // String!
    previewURL: string | null; // String
  };
  PlaylistSongArtist: {
    // field return type
    name: string; // String!
  };
  PlaylistSongLists: {
    // field return type
    currentPage: number; // Int!
    data: NexusGenRootTypes["PlaylistSong"][]; // [PlaylistSong!]!
    pageSize: number; // Int!
    total: number; // Int!
  };
  Playlists: {
    // field return type
    currentPage: number; // Int!
    data: NexusGenRootTypes["Playlist"][]; // [Playlist!]!
    pageSize: number; // Int!
    total: number; // Int!
  };
  PlaylistsByGenre: {
    // field return type
    genre: NexusGenEnums["PlaylistGenre"]; // PlaylistGenre!
    items: NexusGenRootTypes["Playlist"][]; // [Playlist!]!
  };
  Query: {
    // field return type
    featuredPlaylists: NexusGenRootTypes["FeaturedPlaylist"][]; // [FeaturedPlaylist!]!
    playlistById: NexusGenRootTypes["Playlist"] | null; // Playlist
    playlistSongs: NexusGenRootTypes["PlaylistSongLists"]; // PlaylistSongLists!
    playlists: NexusGenRootTypes["Playlists"]; // Playlists!
    playlistsByGenre: NexusGenRootTypes["PlaylistsByGenre"]; // PlaylistsByGenre!
  };
}

export interface NexusGenFieldTypeNames {
  ConvertPlaylistData: {
    // field return type name
    url: "String";
  };
  ConvertPlaylistPayload: {
    // field return type name
    data: "ConvertPlaylistData";
    error: "PlaylistError";
    success: "Boolean";
  };
  CreatePlaylistPayload: {
    // field return type name
    data: "Playlist";
    error: "PlaylistError";
    success: "Boolean";
  };
  FeaturedPlaylist: {
    // field return type name
    genre: "PlaylistGenre";
    items: "Playlist";
  };
  Mutation: {
    // field return type name
    convertPlaylist: "ConvertPlaylistPayload";
    createPlaylist: "CreatePlaylistPayload";
  };
  Playlist: {
    // field return type name
    apiLink: "String";
    coverImage: "String";
    duration: "Int";
    exportId: "String";
    genre: "PlaylistGenre";
    id: "String";
    images: "PlaylistImage";
    importLink: "String";
    importPlaylistId: "String";
    name: "String";
    owner: "PlaylistOwner";
    platform: "PlaylistPlatform";
    public: "Boolean";
    songs: "PlaylistSong";
    totalNumberOfSongs: "Int";
  };
  PlaylistError: {
    // field return type name
    message: "String";
    name: "String";
  };
  PlaylistImage: {
    // field return type name
    height: "Int";
    url: "String";
    width: "Int";
  };
  PlaylistOwner: {
    // field return type name
    name: "String";
  };
  PlaylistSong: {
    // field return type name
    artists: "PlaylistSongArtist";
    coverImage: "String";
    duration: "Int";
    images: "PlaylistImage";
    name: "String";
    previewURL: "String";
  };
  PlaylistSongArtist: {
    // field return type name
    name: "String";
  };
  PlaylistSongLists: {
    // field return type name
    currentPage: "Int";
    data: "PlaylistSong";
    pageSize: "Int";
    total: "Int";
  };
  Playlists: {
    // field return type name
    currentPage: "Int";
    data: "Playlist";
    pageSize: "Int";
    total: "Int";
  };
  PlaylistsByGenre: {
    // field return type name
    genre: "PlaylistGenre";
    items: "Playlist";
  };
  Query: {
    // field return type name
    featuredPlaylists: "FeaturedPlaylist";
    playlistById: "Playlist";
    playlistSongs: "PlaylistSongLists";
    playlists: "Playlists";
    playlistsByGenre: "PlaylistsByGenre";
  };
}

export interface NexusGenArgTypes {
  Mutation: {
    convertPlaylist: {
      // args
      platform: NexusGenEnums["PlaylistPlatform"]; // PlaylistPlatform!
      playlistExportId: string; // String!
    };
    createPlaylist: {
      // args
      author: string; // String!
      platform: NexusGenEnums["PlaylistPlatform"]; // PlaylistPlatform!
      playlistGenre: NexusGenEnums["PlaylistGenre"]; // PlaylistGenre!
      playlistLink: string; // String!
    };
  };
  Query: {
    playlistById: {
      // args
      id: string; // ID!
    };
    playlistSongs: {
      // args
      currentPage: number; // Int!
      pageSize: number; // Int!
      playlistId: string; // String!
    };
    playlists: {
      // args
      currentPage: number; // Int!
      genre?: NexusGenEnums["PlaylistGenre"] | null; // PlaylistGenre
      pageSize: number; // Int!
    };
    playlistsByGenre: {
      // args
      genre: NexusGenEnums["PlaylistGenre"]; // PlaylistGenre!
    };
  };
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false;
    resolveType: true;
    __typename: false;
  };
};

export interface NexusGenTypes {
  context: GraphQLContextType;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes:
    | NexusGenTypes["inputNames"]
    | NexusGenTypes["enumNames"]
    | NexusGenTypes["scalarNames"];
  allOutputTypes:
    | NexusGenTypes["objectNames"]
    | NexusGenTypes["enumNames"]
    | NexusGenTypes["unionNames"]
    | NexusGenTypes["interfaceNames"]
    | NexusGenTypes["scalarNames"];
  allNamedTypes:
    | NexusGenTypes["allInputTypes"]
    | NexusGenTypes["allOutputTypes"];
  abstractTypes: NexusGenTypes["interfaceNames"] | NexusGenTypes["unionNames"];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>;

    /**
     * The nullability guard can be helpful, but is also a potentially expensive operation for lists.
     * We need to iterate the entire list to check for null items to guard against. Set this to true
     * to skip the null guard on a specific field if you know there's no potential for unsafe types.
     */
    skipNullGuard?: boolean;
  }
  interface NexusGenPluginInputFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}
