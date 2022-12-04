export class InvalidMusicStreamingPlatformError extends Error {
  public readonly name = "InvalidMusicStreamingPlatformError";
  public readonly status = 400;

  constructor({ message }: { message?: string }) {
    super(message);
  }
}
