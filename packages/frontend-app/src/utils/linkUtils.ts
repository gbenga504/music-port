import { ResourceError } from "../errors/resource-error";

export function getPlatformName(link: string): string | null {
  const url = new URL(link);
  const origin = url.origin;

  if (origin.indexOf("spotify.com") !== -1) {
    return "spotify";
  }

  if (origin.indexOf("deezer.com") !== -1) {
    return "deezer";
  }

  throw new ResourceError({ message: "Platform link is not recognized" });
}
