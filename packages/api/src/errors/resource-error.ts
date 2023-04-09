export class ResourceError extends Error {
  public readonly name = "ResourceError";
  public readonly status = 500;
  public resource: string;

  constructor({ resource, message }: { resource: string; message?: string }) {
    super(message);
    this.resource = resource;
  }
}
