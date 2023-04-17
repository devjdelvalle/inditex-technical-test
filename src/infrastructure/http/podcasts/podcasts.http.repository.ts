import { Repository } from "../../../domain/services/repository.interface";
import { HttpService } from "../http.service";
import { FetchPodcastsResponse } from "./entities/podcasts";
import { Podcast } from "../../../domain/models/podcast";
import { Episode } from "../../../domain/models/episode";
import { FetchPodcastsEpisodesResponse } from "./entities/episodes";

export class HttpPodcastsRepository implements Repository {
  private readonly httpService: HttpService;
  private fetchUrl = "/us/rss/toppodcasts/limit=100/json";

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

  async fetchPodcastEpisodes(id: string): Promise<Episode[]> {
    const res: Episode[] = [];
    const url = this.getFetchPodcastUrl(id);
    try {
      const response =
        await this.httpService.get<FetchPodcastsEpisodesResponse>(url);

      if (response?.results) {
        const { results } = response;

        for (const episode of results) {
          res.push(
            new Episode(
              episode.trackId,
              episode.artistName,
              episode.description,
              episode.trackName,
              episode.releaseDate,
              episode.trackTimeMillis,
              episode.episodeUrl
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }

    return res;
  }

  private getFetchPodcastUrl(id: string) {
    return `/lookup?id=${id}&media=podcast&entity=podcastEpisode`;
  }
}
