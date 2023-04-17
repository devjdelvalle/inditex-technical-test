import {
  EpisodeDTO,
  episodeDTOFromEntity,
  episodeDTOToEntity,
} from "./episode.dto";
import { Podcast } from "../../../domain/models/podcast";

export interface PodcastDTO {
  lastUpdated: number;
  episodes: EpisodeDTO[];
  id: string;
  title: string;
  author: string;
  image: string;
  description: string;
  link: string;
}

export function podcastDTOFromEntity(entity: Podcast): PodcastDTO {
  return {
    lastUpdated: entity.lastUpdated,
    id: entity.id,
    title: entity.title,
    author: entity.author,
    image: entity.image,
    description: entity.description,
    link: entity.link,
    episodes: entity.episodes.map((episode) => episodeDTOFromEntity(episode)),
  };
}

export function podcastDTOToEntity(dto: PodcastDTO): Podcast {
  if (!dto) {
    return null;
  }

  const entity = new Podcast(
    dto.id,
    dto.title,
    dto.author,
    dto.image,
    dto.description,
    dto.link
  );
  entity.setEpisodes(
    dto.episodes.map((episode) => episodeDTOToEntity(episode))
  );

  return entity;
}
