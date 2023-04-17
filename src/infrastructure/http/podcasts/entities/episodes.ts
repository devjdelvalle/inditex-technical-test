export interface FetchPodcastsEpisodesResponse {
  resultCount: number;
  results: Episode[];
}

interface Episode {
  trackId: number;
  artistName: string;
  trackName: string;
  episodeUrl: string;
  releaseDate: string;
  trackTimeMillis: number;
  description: string;
}
