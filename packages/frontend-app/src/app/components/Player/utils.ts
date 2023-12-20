export interface ISong {
  coverImage: string;
  name: string;
  artists: string[];
  duration: number;
  previewURL?: string | null;
}

export interface ISongWithId extends ISong {
  id: string;
}

export type IPlaylist = ISongWithId[];
type IOnSetCurrentSong = (currentSong: ISongWithId) => void;
type IOnSetIsPlaying = (isPlaying: boolean) => void;

export function getDisplayNameForArtists({
  currentSong,
}: {
  currentSong: ISongWithId;
}): string {
  const artists = currentSong.artists || [];

  return artists.reduce((acc, artist, currentIndex) => {
    const spacer = currentIndex === artists.length - 1 ? "" : ", ";

    return (acc += `${artist}${spacer}`);
  }, "");
}

export function calculateTime(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  const returnedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${returnedSeconds}`;
}

export function handleFastForward({
  playlist,
  currentSong,
  audio,
  onSetCurrentSong,
  onSetIsPlaying,
}: {
  playlist: IPlaylist;
  currentSong: ISongWithId;
  audio: HTMLAudioElement;
  onSetCurrentSong: IOnSetCurrentSong;
  onSetIsPlaying: IOnSetIsPlaying;
}) {
  const currentSongIndex = playlist.findIndex(
    (song) => song.id === currentSong.id,
  );

  let nextSongIndex = currentSongIndex;

  // Only move to next song if the current song is not the last song
  // in the playlist
  if (currentSongIndex + 1 <= playlist.length - 1) {
    nextSongIndex = currentSongIndex + 1;
  }

  handlePause({ audio, onSetIsPlaying });
  audio.currentTime = 0;
  onSetCurrentSong(playlist[nextSongIndex]);
}

export function handleRewind({
  playlist,
  currentSong,
  audio,
  onSetCurrentSong,
  onSetIsPlaying,
}: {
  playlist: IPlaylist;
  currentSong: ISongWithId;
  audio: HTMLAudioElement;
  onSetCurrentSong: IOnSetCurrentSong;
  onSetIsPlaying: IOnSetIsPlaying;
}) {
  const currentSongIndex = playlist.findIndex(
    (song) => song.id === currentSong.id,
  );

  // If the current song is not the last song and the audio has not
  // played for more than 2 seconds, then we want the next song to be the
  // previous song else we just restart the current song

  if (currentSongIndex !== 0 && audio.currentTime <= 2) {
    handlePause({ audio, onSetIsPlaying });
    audio.currentTime = 0;
    onSetCurrentSong(playlist[currentSongIndex - 1]);

    return;
  }

  audio.currentTime = 0;
  handlePlay({ audio, onSetIsPlaying });
}

export async function handlePlay({
  audio,
  onSetIsPlaying,
}: {
  audio: HTMLAudioElement;
  onSetIsPlaying: IOnSetIsPlaying;
}) {
  try {
    await audio.play();

    onSetIsPlaying(true);
  } catch (error) {
    // @todo: Find a better way to handle this
    // so we don't mess up the logs
    console.warn(error);
  }
}

export function handlePause({
  audio,
  onSetIsPlaying,
}: {
  audio: HTMLAudioElement | null;
  onSetIsPlaying: IOnSetIsPlaying;
}) {
  audio?.pause();
  onSetIsPlaying(false);
}

export function handleTogglePlayMode({
  isPlaying,
  isLoadingSong,
  audio,
  onSetIsPlaying,
}: {
  isPlaying: boolean;
  isLoadingSong: boolean;
  audio: HTMLAudioElement;
  onSetIsPlaying: IOnSetIsPlaying;
}) {
  // If the song is loading, we don't want to allow the user play or pause the song
  if (isLoadingSong) return;

  if (isPlaying) {
    return handlePause({
      audio,
      onSetIsPlaying,
    });
  }

  handlePlay({ audio, onSetIsPlaying });
}
