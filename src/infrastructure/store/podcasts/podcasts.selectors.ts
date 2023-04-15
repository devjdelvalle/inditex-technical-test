import { MainState } from "../index";

export const getLastUpdated = (state: MainState) => state.podcasts.lastUpdated;
