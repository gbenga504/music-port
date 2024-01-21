import gql from "graphql-tag";

import {
  playlistFragment,
  playlistGenreFragment,
  playlistSongFragment,
} from "./fragments";

export const playlistGraphQLSchema = gql`
  ${playlistFragment}
  ${playlistSongFragment}
  ${playlistGenreFragment}

  #############################################################
  ######## QUERIES
  #############################################################

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
      genre {
        ...PlaylistGenreFragment
      }
      items {
        ...PlaylistFragment
      }
    }
  }

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

  query playlistById($id: ID!) {
    playlistById(id: $id) {
      ...PlaylistFragment
    }
  }

  #############################################################
  ######## MUTATIONS
  #############################################################

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

  mutation createPlaylist(
    $author: String!
    $playlistLink: String!
    $playlistGenreId: String!
    $platform: PlaylistPlatform!
  ) {
    createPlaylist(
      author: $author
      playlistLink: $playlistLink
      playlistGenreId: $playlistGenreId
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
