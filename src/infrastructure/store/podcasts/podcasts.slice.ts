import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Podcast } from "../../../domain/models/podcast";
import { PodcastDTO } from "./podcast.dto";

type PodcastsState = {
  isFetching: boolean;
  lastUpdated: number;
  entries: PodcastDTO[];
};

const initialState: PodcastsState = {
  isFetching: false,
  lastUpdated: 0,
  entries: [],
};

const podcastsSlice = createSlice({
  name: "podcasts",
  initialState: initialState,
  reducers: {
    setLastUpdate: (state, action: PayloadAction<number>) => {
      state.lastUpdated = action.payload;
    },
    setEntries: (state, action: PayloadAction<Podcast[]>) => {
      state.entries = [...action.payload];
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    fetchPodcasts: (state) => {
      state.isFetching = true;
    },
    fetchPodcast: (state, action: PayloadAction<string>) => {
      state.isFetching = true;
    },
    setPodcastDetails: (state, action: PayloadAction<Podcast>) => {
      const newState = Object.assign({}, state);

      const podcasts = [...newState.entries];
      const currentPodcast = podcasts.find(
        ({ id: podcastId }) => podcastId === action.payload.id
      );
      currentPodcast.episodes = action.payload.episodes;
      currentPodcast.lastUpdated = Date.now();
      newState.entries = [...podcasts];

      state = newState;
    },
  },
});

export const {
  setLastUpdate,
  setEntries,
  fetchPodcasts,
  fetchPodcast,
  setIsFetching,
  setPodcastDetails,
} = podcastsSlice.actions;
export default podcastsSlice.reducer;
