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
  Date: any;
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

export type FeaturedPlaylist = {
  __typename?: "FeaturedPlaylist";
  /** Genre of the playlist */
  genre: PlaylistGenre;
  items: Array<Playlist>;
};

export type Mutation = {
  __typename?: "Mutation";
  convertPlaylist: ConvertPlaylistPayload;
  createPlaylist: CreatePlaylistPayload;
};

export type MutationConvertPlaylistArgs = {
  platform: PlaylistPlatform;
  playlistExportId: Scalars["String"];
};

export type MutationCreatePlaylistArgs = {
  author: Scalars["String"];
  platform: PlaylistPlatform;
  playlistGenre: PlaylistGenre;
  playlistLink: Scalars["String"];
};

export type Playlist = {
  __typename?: "Playlist";
  /** Api link to the playlist on the music streaming platform */
  apiLink: Scalars["String"];
  coverImage: Scalars["String"];
  createdAt: Scalars["Date"];
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
  updatedAt: Scalars["Date"];
};

export type PlaylistError = {
  __typename?: "PlaylistError";
  /** Message sent with the error */
  message: Scalars["String"];
  /** Name of the error */
  name: Scalars["String"];
};

export enum PlaylistGenre {
  Afro = "Afro",
  Blues = "Blues",
  Classical = "Classical",
  Country = "Country",
  Dance = "Dance",
  HipPop = "HipPop",
  Jazz = "Jazz",
  KPop = "KPop",
  Others = "Others",
  Rap = "Rap",
  Reggae = "Reggae",
  Rock = "Rock",
}

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

export enum PlaylistPlatform {
  Deezer = "deezer",
  Spotify = "spotify",
  YoutubeMusic = "youtubeMusic",
}

export type PlaylistSong = {
  __typename?: "PlaylistSong";
  /** Artists who were involved in the song */
  artists: Array<PlaylistSongArtist>;
  coverImage: Scalars["String"];
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

export type Playlists = {
  __typename?: "Playlists";
  currentPage: Scalars["Int"];
  data: Array<Playlist>;
  pageSize: Scalars["Int"];
  total: Scalars["Int"];
};

export type PlaylistsByGenre = {
  __typename?: "PlaylistsByGenre";
  /** Genre of the playlist */
  genre: PlaylistGenre;
  items: Array<Playlist>;
};

export type Query = {
  __typename?: "Query";
  featuredPlaylists: Array<FeaturedPlaylist>;
  playlistById?: Maybe<Playlist>;
  playlistSongs: PlaylistSongLists;
  playlists: Playlists;
  playlistsByGenre: PlaylistsByGenre;
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
  genre?: InputMaybe<PlaylistGenre>;
  pageSize: Scalars["Int"];
};

export type QueryPlaylistsByGenreArgs = {
  genre: PlaylistGenre;
};

export type PlaylistSongFragmentFragment = {
  __typename?: "PlaylistSong";
  name: string;
  coverImage: string;
  duration: number;
  previewURL?: string | null;
  artists: Array<{ __typename?: "PlaylistSongArtist"; name: string }>;
  images: Array<{
    __typename?: "PlaylistImage";
    url: string;
    width?: number | null;
    height?: number | null;
  }>;
};

export type PlaylistFragmentFragment = {
  __typename?: "Playlist";
  id: string;
  importLink: string;
  public: boolean;
  coverImage: string;
  platform: PlaylistPlatform;
  importPlaylistId: string;
  exportId: string;
  apiLink: string;
  name: string;
  genre: PlaylistGenre;
  createdAt: any;
  updatedAt: any;
  duration: number;
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
    coverImage: string;
    duration: number;
    previewURL?: string | null;
    artists: Array<{ __typename?: "PlaylistSongArtist"; name: string }>;
    images: Array<{
      __typename?: "PlaylistImage";
      url: string;
      width?: number | null;
      height?: number | null;
    }>;
  }>;
};

export type PlaylistsQueryVariables = Exact<{
  genre?: InputMaybe<PlaylistGenre>;
  currentPage: Scalars["Int"];
  pageSize: Scalars["Int"];
}>;

export type PlaylistsQuery = {
  __typename?: "Query";
  playlists: {
    __typename?: "Playlists";
    total: number;
    currentPage: number;
    pageSize: number;
    data: Array<{
      __typename?: "Playlist";
      id: string;
      importLink: string;
      public: boolean;
      coverImage: string;
      platform: PlaylistPlatform;
      importPlaylistId: string;
      exportId: string;
      apiLink: string;
      name: string;
      genre: PlaylistGenre;
      createdAt: any;
      updatedAt: any;
      duration: number;
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
        coverImage: string;
        duration: number;
        previewURL?: string | null;
        artists: Array<{ __typename?: "PlaylistSongArtist"; name: string }>;
        images: Array<{
          __typename?: "PlaylistImage";
          url: string;
          width?: number | null;
          height?: number | null;
        }>;
      }>;
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
      name: string;
      coverImage: string;
      duration: number;
      previewURL?: string | null;
      artists: Array<{ __typename?: "PlaylistSongArtist"; name: string }>;
      images: Array<{
        __typename?: "PlaylistImage";
        url: string;
        width?: number | null;
        height?: number | null;
      }>;
    }>;
  };
};

export type FeaturedPlaylistsQueryVariables = Exact<{ [key: string]: never }>;

export type FeaturedPlaylistsQuery = {
  __typename?: "Query";
  featuredPlaylists: Array<{
    __typename?: "FeaturedPlaylist";
    genre: PlaylistGenre;
    items: Array<{
      __typename?: "Playlist";
      id: string;
      importLink: string;
      public: boolean;
      coverImage: string;
      platform: PlaylistPlatform;
      importPlaylistId: string;
      exportId: string;
      apiLink: string;
      name: string;
      genre: PlaylistGenre;
      createdAt: any;
      updatedAt: any;
      duration: number;
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
        coverImage: string;
        duration: number;
        previewURL?: string | null;
        artists: Array<{ __typename?: "PlaylistSongArtist"; name: string }>;
        images: Array<{
          __typename?: "PlaylistImage";
          url: string;
          width?: number | null;
          height?: number | null;
        }>;
      }>;
    }>;
  }>;
};

export type PlaylistsByGenreQueryVariables = Exact<{
  genre: PlaylistGenre;
}>;

export type PlaylistsByGenreQuery = {
  __typename?: "Query";
  playlistsByGenre: {
    __typename?: "PlaylistsByGenre";
    genre: PlaylistGenre;
    items: Array<{
      __typename?: "Playlist";
      id: string;
      importLink: string;
      public: boolean;
      coverImage: string;
      platform: PlaylistPlatform;
      importPlaylistId: string;
      exportId: string;
      apiLink: string;
      name: string;
      genre: PlaylistGenre;
      createdAt: any;
      updatedAt: any;
      duration: number;
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
        coverImage: string;
        duration: number;
        previewURL?: string | null;
        artists: Array<{ __typename?: "PlaylistSongArtist"; name: string }>;
        images: Array<{
          __typename?: "PlaylistImage";
          url: string;
          width?: number | null;
          height?: number | null;
        }>;
      }>;
    }>;
  };
};

export type PlaylistByIdQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type PlaylistByIdQuery = {
  __typename?: "Query";
  playlistById?: {
    __typename?: "Playlist";
    id: string;
    importLink: string;
    public: boolean;
    coverImage: string;
    platform: PlaylistPlatform;
    importPlaylistId: string;
    exportId: string;
    apiLink: string;
    name: string;
    genre: PlaylistGenre;
    createdAt: any;
    updatedAt: any;
    duration: number;
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
      coverImage: string;
      duration: number;
      previewURL?: string | null;
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

export type ConvertPlaylistMutationVariables = Exact<{
  platform: PlaylistPlatform;
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
  playlistLink: Scalars["String"];
  playlistGenre: PlaylistGenre;
  platform: PlaylistPlatform;
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
      coverImage: string;
      platform: PlaylistPlatform;
      importPlaylistId: string;
      exportId: string;
      apiLink: string;
      name: string;
      genre: PlaylistGenre;
      createdAt: any;
      updatedAt: any;
      duration: number;
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
        coverImage: string;
        duration: number;
        previewURL?: string | null;
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

export const PlaylistSongFragmentFragmentDoc = gql`
  fragment PlaylistSongFragment on PlaylistSong {
    artists {
      name
    }
    images {
      url
      width
      height
    }
    name
    coverImage
    duration
    previewURL
  }
`;
export const PlaylistFragmentFragmentDoc = gql`
  fragment PlaylistFragment on Playlist {
    id
    importLink
    public
    coverImage
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
      ...PlaylistSongFragment
    }
    genre
    createdAt
    updatedAt
    duration
  }
  ${PlaylistSongFragmentFragmentDoc}
`;
export const PlaylistsDocument = gql`
  query playlists($genre: PlaylistGenre, $currentPage: Int!, $pageSize: Int!) {
    playlists(genre: $genre, currentPage: $currentPage, pageSize: $pageSize) {
      total
      currentPage
      pageSize
      data {
        ...PlaylistFragment
      }
    }
  }
  ${PlaylistFragmentFragmentDoc}
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
        ...PlaylistSongFragment
      }
    }
  }
  ${PlaylistSongFragmentFragmentDoc}
`;
export const FeaturedPlaylistsDocument = gql`
  query featuredPlaylists {
    featuredPlaylists {
      genre
      items {
        ...PlaylistFragment
      }
    }
  }
  ${PlaylistFragmentFragmentDoc}
`;
export const PlaylistsByGenreDocument = gql`
  query playlistsByGenre($genre: PlaylistGenre!) {
    playlistsByGenre(genre: $genre) {
      genre
      items {
        ...PlaylistFragment
      }
    }
  }
  ${PlaylistFragmentFragmentDoc}
`;
export const PlaylistByIdDocument = gql`
  query playlistById($id: ID!) {
    playlistById(id: $id) {
      ...PlaylistFragment
    }
  }
  ${PlaylistFragmentFragmentDoc}
`;
export const ConvertPlaylistDocument = gql`
  mutation convertPlaylist(
    $platform: PlaylistPlatform!
    $playlistExportId: String!
  ) {
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
    $playlistLink: String!
    $playlistGenre: PlaylistGenre!
    $platform: PlaylistPlatform!
  ) {
    createPlaylist(
      author: $author
      playlistLink: $playlistLink
      playlistGenre: $playlistGenre
      platform: $platform
    ) {
      success
      data {
        ...PlaylistFragment
      }
      error {
        name
        message
      }
    }
  }
  ${PlaylistFragmentFragmentDoc}
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
    featuredPlaylists(
      variables?: FeaturedPlaylistsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<FeaturedPlaylistsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FeaturedPlaylistsQuery>(
            FeaturedPlaylistsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "featuredPlaylists",
        "query",
      );
    },
    playlistsByGenre(
      variables: PlaylistsByGenreQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<PlaylistsByGenreQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PlaylistsByGenreQuery>(
            PlaylistsByGenreDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "playlistsByGenre",
        "query",
      );
    },
    playlistById(
      variables: PlaylistByIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<PlaylistByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PlaylistByIdQuery>(PlaylistByIdDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "playlistById",
        "query",
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
  };
}
export type Sdk = ReturnType<typeof getSdk>;
