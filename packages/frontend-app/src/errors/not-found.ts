export class NotFound extends Error {
  public readonly name = "NotFound";
  public readonly status = 404;

  constructor() {
    super();
  }
}
