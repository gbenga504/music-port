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

export type ExportPlaylistPayload = {
  __typename?: "ExportPlaylistPayload";
  data?: Maybe<ExportPlaylistPayloadData>;
  error?: Maybe<PlaylistError>;
  success: Scalars["Boolean"];
};

export type ExportPlaylistPayloadData = {
  __typename?: "ExportPlaylistPayloadData";
  url: Scalars["String"];
};

export type ImportPlaylistPayload = {
  __typename?: "ImportPlaylistPayload";
  data?: Maybe<Playlist>;
  error?: Maybe<PlaylistError>;
  success: Scalars["Boolean"];
};

export type Mutation = {
  __typename?: "Mutation";
  exportPlaylist: ExportPlaylistPayload;
  importPlaylist: ImportPlaylistPayload;
};

export type MutationExportPlaylistArgs = {
  exportId: Scalars["String"];
  platform: Scalars["String"];
};

export type MutationImportPlaylistArgs = {
  link: Scalars["String"];
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
  playlistByExportId?: Maybe<Playlist>;
  playlistById?: Maybe<Playlist>;
};

export type QueryPlaylistByExportIdArgs = {
  exportId: Scalars["String"];
};

export type QueryPlaylistByIdArgs = {
  id: Scalars["ID"];
};

export type ImportPlaylistMutationVariables = Exact<{
  link: Scalars["String"];
}>;

export type ImportPlaylistMutation = {
  __typename?: "Mutation";
  importPlaylist: {
    __typename?: "ImportPlaylistPayload";
    success: boolean;
    error?: {
      __typename?: "PlaylistError";
      name: string;
      message: string;
    } | null;
    data?: {
      __typename?: "Playlist";
      id: string;
      importLink: string;
      public: boolean;
      platform: PlaylistPlatform;
      importPlaylistId: string;
      exportId: string;
      apiLink: string;
      name: string;
      images: Array<{
        __typename?: "PlaylistImage";
        url: string;
        width?: number | null;
        height?: number | null;
      }>;
      owner: { __typename?: "PlaylistOwner"; name: string };
      songs: Array<{
        __typename?: "PlaylistSong";
        name: string;
        artists: Array<{ __typename?: "PlaylistSongArtist"; name: string }>;
        images: Array<{
          __typename?: "PlaylistImage";
          url: string;
          width?: number | null;
          height?: number | null;
        }>;
      }>;
    } | null;
  };
};

export type GetPlaylistByExportIdQueryVariables = Exact<{
  exportId: Scalars["String"];
}>;

export type GetPlaylistByExportIdQuery = {
  __typename?: "Query";
  playlistByExportId?: {
    __typename?: "Playlist";
    id: string;
    exportId: string;
    platform: PlaylistPlatform;
    public: boolean;
    importLink: string;
    name: string;
    images: Array<{
      __typename?: "PlaylistImage";
      url: string;
      width?: number | null;
      height?: number | null;
    }>;
    owner: { __typename?: "PlaylistOwner"; name: string };
    songs: Array<{ __typename?: "PlaylistSong"; name: string }>;
  } | null;
};

export type ExportPlaylistMutationVariables = Exact<{
  exportId: Scalars["String"];
  platform: Scalars["String"];
}>;

export type ExportPlaylistMutation = {
  __typename?: "Mutation";
  exportPlaylist: {
    __typename?: "ExportPlaylistPayload";
    success: boolean;
    data?: { __typename?: "ExportPlaylistPayloadData"; url: string } | null;
    error?: {
      __typename?: "PlaylistError";
      name: string;
      message: string;
    } | null;
  };
};

export const ImportPlaylistDocument = gql`
  mutation importPlaylist($link: String!) {
    importPlaylist(link: $link) {
      success
      error {
        name
        message
      }
      data {
        id
        importLink
        public
        platform
        importPlaylistId
        exportId
        images {
          url
          width
          height
        }
        apiLink
        name
        owner {
          name
        }
        songs {
          artists {
            name
          }
          images {
            url
            width
            height
          }
          name
        }
      }
    }
  }
`;
export const GetPlaylistByExportIdDocument = gql`
  query getPlaylistByExportId($exportId: String!) {
    playlistByExportId(exportId: $exportId) {
      id
      exportId
      platform
      public
      importLink
      images {
        url
        width
        height
      }
      name
      owner {
        name
      }
      songs {
        name
      }
    }
  }
`;
export const ExportPlaylistDocument = gql`
  mutation exportPlaylist($exportId: String!, $platform: String!) {
    exportPlaylist(exportId: $exportId, platform: $platform) {
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
    importPlaylist(
      variables: ImportPlaylistMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<ImportPlaylistMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ImportPlaylistMutation>(
            ImportPlaylistDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "importPlaylist",
        "mutation",
      );
    },
    getPlaylistByExportId(
      variables: GetPlaylistByExportIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<GetPlaylistByExportIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPlaylistByExportIdQuery>(
            GetPlaylistByExportIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "getPlaylistByExportId",
        "query",
      );
    },
    exportPlaylist(
      variables: ExportPlaylistMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<ExportPlaylistMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ExportPlaylistMutation>(
            ExportPlaylistDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "exportPlaylist",
        "mutation",
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
