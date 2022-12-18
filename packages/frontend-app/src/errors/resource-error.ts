export class ResourceError extends Error {
  public readonly name = "ResourceError";
  public readonly status = 400;

  constructor({ message }: { message: string }) {
    super(message);
  }
}
