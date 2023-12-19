import type { Playlist } from "../app/api/graphql/graphql-client.gen";
import type { IProps as IPlayerProps } from "../app/components/Player/Player";

type PlaylistSong = Playlist["songs"][number];
type PlaylistSongs = Pick<
  PlaylistSong,
  "coverImage" | "name" | "artists" | "duration" | "previewURL"
>[];

export const convertAPIPlaylistToPlayerPlaylist = (
  playlistSongs: PlaylistSongs,
): IPlayerProps["playlist"] => {
  return playlistSongs.map((song) => {
    return {
      coverImage: song.coverImage,
      name: song.name,
      artists: song.artists.map((artist) => artist.name),
      duration: song.duration / 1000,
      previewURL: song.previewURL,
    };
  });
};
