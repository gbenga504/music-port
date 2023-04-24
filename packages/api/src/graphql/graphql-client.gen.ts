import { GraphQLClient } from "graphql-request";
import * as Dom from "graphql-request/dist/types.dom";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ConvertPlaylistData = {
  __typename?: "ConvertPlaylistData";
  url: Scalars["String"];
};

export type ConvertPlaylistPayload = {
  __typename?: "ConvertPlaylistPayload";
  data?: Maybe<ConvertPlaylistData>;
  error?: Maybe<PlaylistError>;
  success: Scalars["Boolean"];
};

export type CreatePlaylistPayload = {
  __typename?: "CreatePlaylistPayload";
  data?: Maybe<Playlist>;
  error?: Maybe<PlaylistError>;
  success: Scalars["Boolean"];
};

export type Mutation = {
  __typename?: "Mutation";
  convertPlaylistUsingAdminAuthToken: ConvertPlaylistPayload;
  createPlaylist: CreatePlaylistPayload;
};

export type MutationConvertPlaylistUsingAdminAuthTokenArgs = {
  fromPlatform: Scalars["String"];
  link: Scalars["String"];
  toPlatform: Scalars["String"];
};

export type MutationCreatePlaylistArgs = {
  author: Scalars["String"];
  platform: Scalars["String"];
  playlistGenre: Scalars["String"];
  playlistLink: Scalars["String"];
  playlistTitle: Scalars["String"];
};

export type Playlist = {
  __typename?: "Playlist";
  /** Api link to the playlist on the music streaming platform */
  apiLink: Scalars["String"];
  /** Unique Id used to export playlist */
  exportId: Scalars["String"];
  id: Scalars["String"];
  /** Images for the playlist */
  images: Array<PlaylistImage>;
  /** Link used to import playlist */
  importLink: Scalars["String"];
  /** Playlist Id used on the music streaming platform */
  importPlaylistId: Scalars["String"];
  /** Name of the playlist */
  name: Scalars["String"];
  /** Owner profile of the playlist */
  owner: PlaylistOwner;
  /** The platform for this playlist */
  platform: PlaylistPlatform;
  /** If the playlist is public or not */
  public: Scalars["Boolean"];
  /** Songs associated with the playlist */
  songs: Array<PlaylistSong>;
};

export type PlaylistError = {
  __typename?: "PlaylistError";
  /** Message sent with the error */
  message: Scalars["String"];
  /** Name of the error */
  name: Scalars["String"];
};

export type PlaylistImage = {
  __typename?: "PlaylistImage";
  height?: Maybe<Scalars["Int"]>;
  url: Scalars["String"];
  width?: Maybe<Scalars["Int"]>;
};

export type PlaylistOwner = {
  __typename?: "PlaylistOwner";
  name: Scalars["String"];
};

/** The platform for this playlist */
export enum PlaylistPlatform {
  Deezer = "deezer",
  Spotify = "spotify",
}

export type PlaylistSong = {
  __typename?: "PlaylistSong";
  /** Artists who were involved in the song */
  artists: Array<PlaylistSongArtist>;
  /** Images associated with the song */
  images: Array<PlaylistImage>;
  /** Name of the song */
  name: Scalars["String"];
  /** URL to preview the song */
  previewURL?: Maybe<Scalars["String"]>;
};

export type PlaylistSongArtist = {
  __typename?: "PlaylistSongArtist";
  name: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  ok: Scalars["Boolean"];
};

export type ConvertPlaylistUsingAdminAuthTokenMutationVariables = Exact<{
  fromPlatform: Scalars["String"];
  toPlatform: Scalars["String"];
  link: Scalars["String"];
}>;

export type ConvertPlaylistUsingAdminAuthTokenMutation = {
  __typename?: "Mutation";
  convertPlaylistUsingAdminAuthToken: {
    __typename?: "ConvertPlaylistPayload";
    success: boolean;
    data?: { __typename?: "ConvertPlaylistData"; url: string } | null;
    error?: {
      __typename?: "PlaylistError";
      name: string;
      message: string;
    } | null;
  };
};

export const ConvertPlaylistUsingAdminAuthTokenDocument = gql`
  mutation convertPlaylistUsingAdminAuthToken(
    $fromPlatform: String!
    $toPlatform: String!
    $link: String!
  ) {
    convertPlaylistUsingAdminAuthToken(
      fromPlatform: $fromPlatform
      toPlatform: $toPlatform
      link: $link
    ) {
      success
      data {
        url
      }
      error {
        name
        message
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    convertPlaylistUsingAdminAuthToken(
      variables: ConvertPlaylistUsingAdminAuthTokenMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<ConvertPlaylistUsingAdminAuthTokenMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ConvertPlaylistUsingAdminAuthTokenMutation>(
            ConvertPlaylistUsingAdminAuthTokenDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "convertPlaylistUsingAdminAuthToken",
        "mutation",
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
