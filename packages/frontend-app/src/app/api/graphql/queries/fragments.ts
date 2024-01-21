import gql from "graphql-tag";

export const playlistGenreFragment = gql`
  fragment PlaylistGenreFragment on PlaylistGenre {
    id
    name
    isSystemGenerated
  }
`;

export const playlistSongFragment = gql`
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

export const playlistFragment = gql`
  ${playlistSongFragment}
  ${playlistGenreFragment}

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
`;
