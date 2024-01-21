import gql from "graphql-tag";

import { playlistGenreFragment } from "./fragments";

export const playlistGenreGraphQLSchema = gql`
  ${playlistGenreFragment}

  #############################################################
  ######## QUERIES
  #############################################################

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
`;
