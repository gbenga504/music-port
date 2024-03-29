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
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
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

export type FeaturedPlaylistsQueryVariables = Exact<{ [key: string]: never }>;

export type FeaturedPlaylistsQuery = {
  __typename?: "Query";
  featuredPlaylists: Array<{
    __typename?: "FeaturedPlaylist";
    genre: PlaylistGenre;
  }>;
};

export const FeaturedPlaylistsDocument = gql`
  query featuredPlaylists {
    featuredPlaylists {
      genre
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
  };
}
export type Sdk = ReturnType<typeof getSdk>;
