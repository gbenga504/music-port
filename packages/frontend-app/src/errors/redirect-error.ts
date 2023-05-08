export class RedirectError extends Error {
  public readonly name = "RedirectError";
  public url: string;
  public status: number;

  constructor({ url, status = 302 }: { url: string; status?: number }) {
    super();
    this.url = url;
    this.status = status;
  }
}
