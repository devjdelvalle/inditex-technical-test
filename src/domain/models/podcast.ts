import { Episode } from "./episode";

export class Podcast {
  public lastUpdated: number;
  public episodes: Episode[];

  constructor(
    readonly id: string,
    readonly title: string,
    readonly author: string,
    readonly image: string,
    readonly description: string,
    readonly link: string
  ) {
    this.lastUpdated = 0;
    this.episodes = [];
  }

  setLastUpdated(lastUpdated: number) {
    this.lastUpdated = lastUpdated;
  }

  setEpisodes(episodes: Episode[]) {
    this.episodes = episodes;
  }
}
