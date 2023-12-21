import gql from "graphql-tag";

import { playlistFragment, playlistSongFragment } from "./fragments";

export const playlistGraphQLSchema = gql`
  ${playlistFragment}
  ${playlistSongFragment}

  #############################################################
  ######## QUERIES
  #############################################################

  query playlists($genre: String, $currentPage: Int!, $pageSize: Int!) {
    playlists(genre: $genre, currentPage: $currentPage, pageSize: $pageSize) {
      total
      currentPage
      pageSize
      data {
        ...PlaylistFragment
      }
    }
  }

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

  query featuredPlaylists {
    featuredPlaylists {
      genre
      items {
        ...PlaylistFragment
      }
    }
  }

  #############################################################
  ######## MUTATIONS
  #############################################################

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
`;
