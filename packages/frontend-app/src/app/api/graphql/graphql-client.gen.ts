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
  convertPlaylist: ConvertPlaylistPayload;
  convertPlaylistUsingAdminAuthToken: ConvertPlaylistPayload;
  createPlaylist: CreatePlaylistPayload;
};

export type MutationConvertPlaylistArgs = {
  platform: Scalars["String"];
  playlistExportId: Scalars["String"];
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
  coverImage?: Maybe<Scalars["String"]>;
  duration: Scalars["Int"];
  /** Unique Id used to export playlist */
  exportId: Scalars["String"];
  /** Genre of the playlist */
  genre: PlaylistGenre;
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
  totalNumberOfSongs: Scalars["Int"];
};

export type PlaylistError = {
  __typename?: "PlaylistError";
  /** Message sent with the error */
  message: Scalars["String"];
  /** Name of the error */
  name: Scalars["String"];
};

export enum PlaylistGenre {
  Others = "Others",
  Afro = "afro",
  HipPop = "hipPop",
}

export type PlaylistImage = {
  __typename?: "PlaylistImage";
  height?: Maybe<Scalars["Int"]>;
  url: Scalars["String"];
  width?: Maybe<Scalars["Int"]>;
};

export type PlaylistLists = {
  __typename?: "PlaylistLists";
  currentPage: Scalars["Int"];
  data: Array<Playlist>;
  pageSize: Scalars["Int"];
  total: Scalars["Int"];
};

export type PlaylistOwner = {
  __typename?: "PlaylistOwner";
  name: Scalars["String"];
};

export enum PlaylistPlatform {
  Deezer = "deezer",
  Spotify = "spotify",
}

export type PlaylistSong = {
  __typename?: "PlaylistSong";
  /** Artists who were involved in the song */
  artists: Array<PlaylistSongArtist>;
  coverImage?: Maybe<Scalars["String"]>;
  duration: Scalars["Int"];
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

export type PlaylistSongLists = {
  __typename?: "PlaylistSongLists";
  currentPage: Scalars["Int"];
  data: Array<PlaylistSong>;
  pageSize: Scalars["Int"];
  total: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  playlistById?: Maybe<Playlist>;
  playlistSongs: PlaylistSongLists;
  playlists: PlaylistLists;
};

export type QueryPlaylistByIdArgs = {
  id: Scalars["ID"];
};

export type QueryPlaylistSongsArgs = {
  currentPage: Scalars["Int"];
  pageSize: Scalars["Int"];
  playlistId: Scalars["String"];
};

export type QueryPlaylistsArgs = {
  currentPage: Scalars["Int"];
  genre?: InputMaybe<Scalars["String"]>;
  pageSize: Scalars["Int"];
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

export type ConvertPlaylistMutationVariables = Exact<{
  platform: Scalars["String"];
  playlistExportId: Scalars["String"];
}>;

export type ConvertPlaylistMutation = {
  __typename?: "Mutation";
  convertPlaylist: {
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

export type CreatePlaylistMutationVariables = Exact<{
  author: Scalars["String"];
  playlistTitle: Scalars["String"];
  playlistLink: Scalars["String"];
  playlistGenre: Scalars["String"];
  platform: Scalars["String"];
}>;

export type CreatePlaylistMutation = {
  __typename?: "Mutation";
  createPlaylist: {
    __typename?: "CreatePlaylistPayload";
    success: boolean;
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
      genre: PlaylistGenre;
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
    error?: {
      __typename?: "PlaylistError";
      name: string;
      message: string;
    } | null;
  };
};

export type PlaylistsQueryVariables = Exact<{
  genre?: InputMaybe<Scalars["String"]>;
  currentPage: Scalars["Int"];
  pageSize: Scalars["Int"];
}>;

export type PlaylistsQuery = {
  __typename?: "Query";
  playlists: {
    __typename?: "PlaylistLists";
    total: number;
    currentPage: number;
    pageSize: number;
    data: Array<{
      __typename?: "Playlist";
      id: string;
      platform: PlaylistPlatform;
      exportId: string;
      apiLink: string;
      name: string;
      genre: PlaylistGenre;
      totalNumberOfSongs: number;
      duration: number;
      coverImage?: string | null;
      owner: { __typename?: "PlaylistOwner"; name: string };
    }>;
  };
};

export type PlaylistSongsQueryVariables = Exact<{
  playlistId: Scalars["String"];
  currentPage: Scalars["Int"];
  pageSize: Scalars["Int"];
}>;

export type PlaylistSongsQuery = {
  __typename?: "Query";
  playlistSongs: {
    __typename?: "PlaylistSongLists";
    total: number;
    currentPage: number;
    pageSize: number;
    data: Array<{
      __typename?: "PlaylistSong";
      previewURL?: string | null;
      name: string;
      duration: number;
      coverImage?: string | null;
      artists: Array<{ __typename?: "PlaylistSongArtist"; name: string }>;
    }>;
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
export const ConvertPlaylistDocument = gql`
  mutation convertPlaylist($platform: String!, $playlistExportId: String!) {
    convertPlaylist(platform: $platform, playlistExportId: $playlistExportId) {
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
export const CreatePlaylistDocument = gql`
  mutation createPlaylist(
    $author: String!
    $playlistTitle: String!
    $playlistLink: String!
    $playlistGenre: String!
    $platform: String!
  ) {
    createPlaylist(
      author: $author
      playlistTitle: $playlistTitle
      playlistLink: $playlistLink
      playlistGenre: $playlistGenre
      platform: $platform
    ) {
      success
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
        genre
      }
      error {
        name
        message
      }
    }
  }
`;
export const PlaylistsDocument = gql`
  query playlists($genre: String, $currentPage: Int!, $pageSize: Int!) {
    playlists(genre: $genre, currentPage: $currentPage, pageSize: $pageSize) {
      total
      currentPage
      pageSize
      data {
        id
        platform
        exportId
        apiLink
        name
        owner {
          name
        }
        genre
        totalNumberOfSongs
        duration
        coverImage
      }
    }
  }
`;
export const PlaylistSongsDocument = gql`
  query playlistSongs(
    $playlistId: String!
    $currentPage: Int!
    $pageSize: Int!
  ) {
    playlistSongs(
      playlistId: $playlistId
      currentPage: $currentPage
      pageSize: $pageSize
    ) {
      total
      currentPage
      pageSize
      data {
        previewURL
        name
        duration
        coverImage
        artists {
          name
        }
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
    convertPlaylist(
      variables: ConvertPlaylistMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<ConvertPlaylistMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ConvertPlaylistMutation>(
            ConvertPlaylistDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "convertPlaylist",
        "mutation",
      );
    },
    createPlaylist(
      variables: CreatePlaylistMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<CreatePlaylistMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreatePlaylistMutation>(
            CreatePlaylistDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "createPlaylist",
        "mutation",
      );
    },
    playlists(
      variables: PlaylistsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<PlaylistsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PlaylistsQuery>(PlaylistsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "playlists",
        "query",
      );
    },
    playlistSongs(
      variables: PlaylistSongsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<PlaylistSongsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PlaylistSongsQuery>(PlaylistSongsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "playlistSongs",
        "query",
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
