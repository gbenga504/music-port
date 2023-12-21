import {
  PlaylistPlatform,
  PlaylistGenre,
} from "../app/api/graphql/graphql-client.gen";

export const PlaylistGenreValues = Object.values(PlaylistGenre) as [
  PlaylistGenre,
  ...PlaylistGenre[],
];

export const PlaylistPlatformValues = Object.values(PlaylistPlatform) as [
  PlaylistPlatform,
  ...PlaylistPlatform[],
];
