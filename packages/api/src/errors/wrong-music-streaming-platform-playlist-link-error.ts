export class WrongMusicStreamingPlatformPlaylistLinkError extends Error {
  public readonly name = "WrongMusicStreamingPlatformPlaylistLinkError";

  constructor() {
    super("Playlist Link provided is wrong");
  }
}
