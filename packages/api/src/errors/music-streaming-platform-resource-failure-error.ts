export class MusicStreamingPlatformResourceFailureError extends Error {
  public readonly name = "MusicStreamingPlatformResourceFailureError";
  public code: number | undefined;

  constructor({ message, code }: { message?: string; code?: number }) {
    super(message);
    this.code = code;
  }
}
