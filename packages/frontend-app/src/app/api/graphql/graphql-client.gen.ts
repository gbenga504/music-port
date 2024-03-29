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

export type CreatePlaylistGenrePayload = {
  __typename?: "CreatePlaylistGenrePayload";
  data?: Maybe<PlaylistGenre>;
  error?: Maybe<PlaylistError>;
  success: Scalars["Boolean"];
};

export type CreatePlaylistPayload = {
  __typename?: "CreatePlaylistPayload";
  data?: Maybe<Playlist>;
  error?: Maybe<PlaylistError>;
  success: Scalars["Boolean"];
};

export type DeletePlaylist = {
  __typename?: "DeletePlaylist";
  error?: Maybe<PlaylistError>;
  success: Scalars["Boolean"];
};

export type EditPlaylistGenrePayload = {
  __typename?: "EditPlaylistGenrePayload";
  data?: Maybe<PlaylistGenre>;
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
  createPlaylistGenre: CreatePlaylistGenrePayload;
  deletePlaylist: DeletePlaylist;
  editPlaylistGenre: EditPlaylistGenrePayload;
};

export type MutationConvertPlaylistArgs = {
  platform: PlaylistPlatform;
  playlistExportId: Scalars["String"];
};

export type MutationCreatePlaylistArgs = {
  author: Scalars["String"];
  platform: PlaylistPlatform;
  playlistGenreId: Scalars["String"];
  playlistLink: Scalars["String"];
  playlistName?: InputMaybe<Scalars["String"]>;
};

export type MutationCreatePlaylistGenreArgs = {
  isSystemGenerated: Scalars["Boolean"];
  name: Scalars["String"];
};

export type MutationDeletePlaylistArgs = {
  id: Scalars["ID"];
};

export type MutationEditPlaylistGenreArgs = {
  id: Scalars["ID"];
  isSystemGenerated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
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
  genreLink: PlaylistGenre;
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

export type PlaylistGenre = {
  __typename?: "PlaylistGenre";
  id: Scalars["String"];
  /** Tells if the genre should contain only playlist created by the system or those created by users */
  isSystemGenerated: Scalars["Boolean"];
  /** Name of the Genre */
  name: Scalars["String"];
};

export type PlaylistGenres = {
  __typename?: "PlaylistGenres";
  currentPage: Scalars["Int"];
  data: Array<PlaylistGenre>;
  pageSize: Scalars["Int"];
  total: Scalars["Int"];
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
  playlistGenreById?: Maybe<PlaylistGenre>;
  playlistGenres: PlaylistGenres;
  playlistSongs: PlaylistSongLists;
  playlists: Playlists;
  playlistsByGenre: PlaylistsByGenre;
};

export type QueryPlaylistByIdArgs = {
  id: Scalars["ID"];
};

export type QueryPlaylistGenreByIdArgs = {
  id: Scalars["ID"];
};

export type QueryPlaylistGenresArgs = {
  currentPage: Scalars["Int"];
  pageSize: Scalars["Int"];
};

export type QueryPlaylistSongsArgs = {
  currentPage: Scalars["Int"];
  pageSize: Scalars["Int"];
  playlistId: Scalars["String"];
};

export type QueryPlaylistsArgs = {
  currentPage: Scalars["Int"];
  genreId: Scalars["String"];
  pageSize: Scalars["Int"];
};

export type QueryPlaylistsByGenreArgs = {
  genreId: Scalars["String"];
};

export type PlaylistGenreFragmentFragment = {
  __typename?: "PlaylistGenre";
  id: string;
  name: string;
  isSystemGenerated: boolean;
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
  genreLink: {
    __typename?: "PlaylistGenre";
    id: string;
    name: string;
    isSystemGenerated: boolean;
  };
};

export type PlaylistGenresQueryVariables = Exact<{
  currentPage: Scalars["Int"];
  pageSize: Scalars["Int"];
}>;

export type PlaylistGenresQuery = {
  __typename?: "Query";
  playlistGenres: {
    __typename?: "PlaylistGenres";
    total: number;
    currentPage: number;
    pageSize: number;
    data: Array<{
      __typename?: "PlaylistGenre";
      id: string;
      name: string;
      isSystemGenerated: boolean;
    }>;
  };
};

export type PlaylistsQueryVariables = Exact<{
  genreId: Scalars["String"];
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
      genreLink: {
        __typename?: "PlaylistGenre";
        id: string;
        name: string;
        isSystemGenerated: boolean;
      };
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
    genre: {
      __typename?: "PlaylistGenre";
      id: string;
      name: string;
      isSystemGenerated: boolean;
    };
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
      genreLink: {
        __typename?: "PlaylistGenre";
        id: string;
        name: string;
        isSystemGenerated: boolean;
      };
    }>;
  }>;
};

export type PlaylistsByGenreQueryVariables = Exact<{
  genreId: Scalars["String"];
}>;

export type PlaylistsByGenreQuery = {
  __typename?: "Query";
  playlistsByGenre: {
    __typename?: "PlaylistsByGenre";
    genre: {
      __typename?: "PlaylistGenre";
      id: string;
      name: string;
      isSystemGenerated: boolean;
    };
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
      genreLink: {
        __typename?: "PlaylistGenre";
        id: string;
        name: string;
        isSystemGenerated: boolean;
      };
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
    genreLink: {
      __typename?: "PlaylistGenre";
      id: string;
      name: string;
      isSystemGenerated: boolean;
    };
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
  playlistGenreId: Scalars["String"];
  playlistName?: InputMaybe<Scalars["String"]>;
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
      genreLink: {
        __typename?: "PlaylistGenre";
        id: string;
        name: string;
        isSystemGenerated: boolean;
      };
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
export const PlaylistGenreFragmentFragmentDoc = gql`
  fragment PlaylistGenreFragment on PlaylistGenre {
    id
    name
    isSystemGenerated
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
    genreLink {
      ...PlaylistGenreFragment
    }
    createdAt
    updatedAt
    duration
  }
  ${PlaylistSongFragmentFragmentDoc}
  ${PlaylistGenreFragmentFragmentDoc}
`;
export const PlaylistGenresDocument = gql`
  query playlistGenres($currentPage: Int!, $pageSize: Int!) {
    playlistGenres(currentPage: $currentPage, pageSize: $pageSize) {
      total
      currentPage
      pageSize
      data {
        ...PlaylistGenreFragment
      }
    }
  }
  ${PlaylistGenreFragmentFragmentDoc}
`;
export const PlaylistsDocument = gql`
  query playlists($genreId: String!, $currentPage: Int!, $pageSize: Int!) {
    playlists(
      genreId: $genreId
      currentPage: $currentPage
      pageSize: $pageSize
    ) {
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
      genre {
        ...PlaylistGenreFragment
      }
      items {
        ...PlaylistFragment
      }
    }
  }
  ${PlaylistGenreFragmentFragmentDoc}
  ${PlaylistFragmentFragmentDoc}
`;
export const PlaylistsByGenreDocument = gql`
  query playlistsByGenre($genreId: String!) {
    playlistsByGenre(genreId: $genreId) {
      genre {
        ...PlaylistGenreFragment
      }
      items {
        ...PlaylistFragment
      }
    }
  }
  ${PlaylistGenreFragmentFragmentDoc}
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
    $playlistGenreId: String!
    $playlistName: String
    $platform: PlaylistPlatform!
  ) {
    createPlaylist(
      author: $author
      playlistLink: $playlistLink
      playlistGenreId: $playlistGenreId
      playlistName: $playlistName
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
    playlistGenres(
      variables: PlaylistGenresQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<PlaylistGenresQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PlaylistGenresQuery>(
            PlaylistGenresDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "playlistGenres",
        "query",
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
