import { MainState } from "../index";

export const getLastUpdated = (state: MainState) => state.podcasts.lastUpdated;
export const getPodcasts = (state: MainState) => state.podcasts.entries;

export const getFilteredPodcasts = (id) => (state: MainState) => {
  return state.podcasts.entries.filter(({ title }) =>
    title.toLowerCase().includes(id, 0)
  );
};
