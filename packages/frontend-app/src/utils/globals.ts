class Globals {
  private siteOrigin: string | undefined;

  setSiteOrigin(origin: string): void {
    this.siteOrigin = origin;
  }

  getSiteOrigin(): string {
    if (!this.siteOrigin) {
      throw new Error(
        "Origin is undefined. Please make sure [setSiteOrigin] is called before this method",
      );
    }

    return this.siteOrigin;
  }
}

const globals = new Globals();

export { globals };
