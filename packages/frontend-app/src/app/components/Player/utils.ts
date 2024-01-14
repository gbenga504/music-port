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
type IOnSetIsLoadingSong = (isLoadingSong: boolean) => void;
type IOnSetTotalDuration = (totalDuration: number) => void;
type IOnSetCurrentDuration = (currentDuration: number) => void;

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
    // This might fail especially if this function wasn't triggered by any user interactions,
    // hence it is important that it is called first before anything else.
    await audio.play();

    onSetIsPlaying(true);
    // eslint-disable-next-line unicorn/prefer-optional-catch-binding
  } catch (error) {
    // @todo: Find a better way to handle this
    // so we don't mess up the logs
    onSetIsPlaying(false);
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

export function preloadNext2Songs({
  currentSongId,
  playlist,
}: {
  currentSongId: string;
  playlist: IPlaylist;
}) {
  // We preload the next 2 songs in the playlist
  // A song is only loaded if it hasn't been loaded before "!audioElement.duration" else
  // no need to waste resources
  // Maybe we can also experiment with removing the "preload='none'" attribute on the audio
  // and adding the audio into the DOM on demand
  const next2SongsById = [];

  const currentSongIndex = playlist.findIndex(
    (song) => song.id === currentSongId,
  );

  if (currentSongIndex + 1 <= playlist.length - 1) {
    next2SongsById.push(playlist[currentSongIndex + 1].id);
  }

  if (currentSongIndex + 2 <= playlist.length - 1) {
    next2SongsById.push(playlist[currentSongIndex + 2].id);
  }

  next2SongsById.forEach((songId) => {
    const audioElement = document.getElementById(
      songId,
    ) as HTMLAudioElement | null;

    if (audioElement && !audioElement.duration) {
      audioElement.load();
    }
  });
}

export async function handleAudioLoadedData({
  audio,
  onSetTotalDuration,
  onSetIsLoadingSong,
  onSetIsPlaying,
}: {
  audio: HTMLAudioElement;
  onSetTotalDuration: IOnSetTotalDuration;
  onSetIsLoadingSong: IOnSetIsLoadingSong;
  onSetIsPlaying: IOnSetIsPlaying;
}): Promise<void> {
  onSetIsLoadingSong(false);
  onSetTotalDuration(Math.floor(audio.duration || 0));

  await handlePlay({
    audio,
    onSetIsPlaying,
  });
}

export function updateAudioCurrentDuration({
  isSongDurationSliderActive,
  onSetCurrentDuration,
  audio,
  onSetIsPlaying,
}: {
  isSongDurationSliderActive: boolean;
  onSetCurrentDuration: IOnSetCurrentDuration;
  audio: HTMLAudioElement | null;
  onSetIsPlaying: IOnSetIsPlaying;
}) {
  if (!isSongDurationSliderActive) {
    const currentDuration = Math.floor(audio?.currentTime || 0);
    onSetCurrentDuration(currentDuration);

    // The Audio stops playing if the duration has reached the total duration
    // We want to also update the UI to reflect this
    if (
      currentDuration === Math.floor(audio?.duration || Number.MAX_SAFE_INTEGER)
    ) {
      onSetIsPlaying(false);
    }
  }
}

export function loadAudioIfNotPossibleToPlay({
  audio,
  onSetIsPlaying,
  currentSongId,
  playlist,
}: {
  audio: HTMLAudioElement;
  onSetIsPlaying: IOnSetIsPlaying;
  currentSongId: string;
  playlist: IPlaylist;
}) {
  if (audio.duration) {
    handlePlay({
      audio,
      onSetIsPlaying,
    });

    preloadNext2Songs({ currentSongId, playlist });
  } else {
    audio.load();

    preloadNext2Songs({ currentSongId, playlist });
  }
}
