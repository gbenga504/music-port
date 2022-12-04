export class UnauthorizedError extends Error {
  public readonly name = "UnauthorizedError";
  public readonly status = 401;

  constructor({ message }: { message?: string }) {
    super(message);
  }
}
