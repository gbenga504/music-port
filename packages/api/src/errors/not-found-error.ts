export class NotFoundError extends Error {
  public readonly name = "NotFoundError";
  public readonly status = 404;

  constructor() {
    super();
  }
}
