import { MainState } from "../index";
import { podcastDTOToEntity } from "./podcast.dto";

export const getLastUpdated = (state: MainState) => state.podcasts.lastUpdated;
export const getPodcasts = (state: MainState) =>
  state.podcasts.entries.map((dto) => podcastDTOToEntity(dto));

export const getPodcast = (id) => (state: MainState) => {
  return podcastDTOToEntity(
    state.podcasts.entries.find(({ id: podcastId }) => podcastId === id)
  );
};

export const getFilteredPodcasts = (id) => (state: MainState) => {
  return state.podcasts.entries
    .filter(({ title }) => title.toLowerCase().includes(id, 0))
    .map((dto) => podcastDTOToEntity(dto));
};
