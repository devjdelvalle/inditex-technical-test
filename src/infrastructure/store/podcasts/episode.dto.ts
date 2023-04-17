import { Episode } from "../../../domain/models/episode";

export interface EpisodeDTO {
  id: number;
  artist: string;
  description: string;
  title: string;
  date: string;
  duration: number;
  link: string;
}

export function episodeDTOFromEntity(entity: Episode): EpisodeDTO {
  return {
    id: entity.id,
    artist: entity.artist,
    description: entity.description,
    title: entity.title,
    date: entity.date,
    duration: entity.duration,
    link: entity.link,
  };
}

export function episodeDTOToEntity(dto: EpisodeDTO): Episode {
  return new Episode(
    dto.id,
    dto.artist,
    dto.description,
    dto.title,
    dto.date,
    dto.duration,
    dto.link
  );
}
