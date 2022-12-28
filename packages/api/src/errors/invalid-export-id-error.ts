export class InvalidExportIdError extends Error {
  public readonly name = "InvalidExportIdError";

  constructor({ message }: { message?: string }) {
    super(message);
  }
}
