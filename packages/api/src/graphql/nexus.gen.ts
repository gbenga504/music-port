// @ts-nocheck

import type { GraphQLContextType } from "./../types/graphql-context-type";
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

export interface NexusGenEnums {}

export interface NexusGenScalars {
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenObjects {
  ImportPlaylistPayload: {
    // root type
    data?: NexusGenRootTypes["Playlist"] | null; // Playlist
    error?: NexusGenRootTypes["PlaylistError"] | null; // PlaylistError
    success: boolean; // Boolean!
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
    images: NexusGenRootTypes["PlaylistImage"][]; // [PlaylistImage!]!
    name: string; // String!
    previewURL?: string | null; // String
  };
  PlaylistSongArtist: {
    // root type
    name: string; // String!
  };
  Query: {};
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects;

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars;

export interface NexusGenFieldTypes {
  ImportPlaylistPayload: {
    // field return type
    data: NexusGenRootTypes["Playlist"] | null; // Playlist
    error: NexusGenRootTypes["PlaylistError"] | null; // PlaylistError
    success: boolean; // Boolean!
  };
  Mutation: {
    // field return type
    importPlaylist: NexusGenRootTypes["ImportPlaylistPayload"]; // ImportPlaylistPayload!
  };
  Playlist: {
    // field return type
    apiLink: string; // String!
    exportLink: string; // String!
    id: string; // String!
    images: NexusGenRootTypes["PlaylistImage"][]; // [PlaylistImage!]!
    importLink: string; // String!
    importPlaylistId: string; // String!
    name: string; // String!
    owner: NexusGenRootTypes["PlaylistOwner"]; // PlaylistOwner!
    songs: NexusGenRootTypes["PlaylistSong"][]; // [PlaylistSong!]!
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
    images: NexusGenRootTypes["PlaylistImage"][]; // [PlaylistImage!]!
    name: string; // String!
    previewURL: string | null; // String
  };
  PlaylistSongArtist: {
    // field return type
    name: string; // String!
  };
  Query: {
    // field return type
    playlistByExportLink: NexusGenRootTypes["Playlist"] | null; // Playlist
    playlistById: NexusGenRootTypes["Playlist"] | null; // Playlist
  };
}

export interface NexusGenFieldTypeNames {
  ImportPlaylistPayload: {
    // field return type name
    data: "Playlist";
    error: "PlaylistError";
    success: "Boolean";
  };
  Mutation: {
    // field return type name
    importPlaylist: "ImportPlaylistPayload";
  };
  Playlist: {
    // field return type name
    apiLink: "String";
    exportLink: "String";
    id: "String";
    images: "PlaylistImage";
    importLink: "String";
    importPlaylistId: "String";
    name: "String";
    owner: "PlaylistOwner";
    songs: "PlaylistSong";
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
    images: "PlaylistImage";
    name: "String";
    previewURL: "String";
  };
  PlaylistSongArtist: {
    // field return type name
    name: "String";
  };
  Query: {
    // field return type name
    playlistByExportLink: "Playlist";
    playlistById: "Playlist";
  };
}

export interface NexusGenArgTypes {
  Mutation: {
    importPlaylist: {
      // args
      link: string; // String!
    };
  };
  Query: {
    playlistByExportLink: {
      // args
      exportLink: string; // String!
    };
    playlistById: {
      // args
      id: string; // ID!
    };
  };
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

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
