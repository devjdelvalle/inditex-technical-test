import { Podcast } from "../models/podcast";

export interface Repository {
  fetchPodcasts(): Promise<Podcast[]>;
  fetchPodcastEpisodes(id: string): Promise<Episode[]>;
}
