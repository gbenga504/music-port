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

export function calculateTime(
  durationInMilliseconds: number,
  formatStyle: "NO_FORMAT" | "SHORT" | "LONG" = "NO_FORMAT",
): string {
  const duration = durationInMilliseconds / 1000;
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  const returnedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  switch (formatStyle) {
    case "LONG":
      return `${minutes} minutes, ${returnedSeconds} seconds`;
    case "SHORT":
      return `${minutes} mins, ${returnedSeconds} secs`;
    default:
      return `${minutes}:${returnedSeconds}`;
  }
}
