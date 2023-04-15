import { Repository } from "../../../domain/services/repository.interface";
import { HttpService } from "../http.service";
import { FetchPodcastsResponse } from "./entities/podcasts";
import { Podcast } from "../../../domain/models/podcast";

export class HttpPodcastsRepository implements Repository<Podcast> {
  private readonly httpService: HttpService;
  private fetchUrl = "/us/rss/toppodcasts/limit=100/genre=1310/json";

  constructor() {
    this.httpService = new HttpService();
  }

  async fetchPodcasts(): Promise<Podcast[]> {
    const res = [];
    try {
      const response = await this.httpService.get<FetchPodcastsResponse>(
        this.fetchUrl
      );

      if (response?.feed) {
        const { entry } = response.feed;

        for (const podcast of entry) {
          res.push(
            new Podcast(
              podcast.id.attributes["im:id"],
              podcast["im:name"].label,
              podcast["im:artist"].label,
              podcast["im:image"][0].label,
              podcast.summary.label,
              podcast.link.attributes.href
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }

    return res;
  }

  async getPodcast(id: string): Promise<Podcast> {
    const res = new Podcast("", "", "", "", "", "");
    return res;
  }
}
