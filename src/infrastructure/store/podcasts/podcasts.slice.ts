import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Podcast } from "../../../domain/models/podcast";

type PodcastsState = {
  isFetching: boolean;
  lastUpdated: number;
  entries: Podcast[];
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
      state.entries = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    fetchPodcasts: (state) => {
      state.isFetching = true;
    },
  },
});

export const { setLastUpdate, setEntries, fetchPodcasts, setIsFetching } =
  podcastsSlice.actions;
export default podcastsSlice.reducer;
