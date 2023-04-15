import { Repository } from "./repository.interface";
import { Podcast } from "../models/podcast";

class PodcastsService {
  constructor(private readonly repository: Repository<Podcast>) {}

  async fetchPodcasts(): Promise<Podcast[]> {
    return this.repository.fetchPodcasts();
  }

  async getPodcast(id: string): Promise<Podcast> {
    return this.repository.getPodcast(id);
  }
}
