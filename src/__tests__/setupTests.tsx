import "@testing-library/jest-dom";
import React, { PropsWithChildren } from "react";
import { render, renderHook } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import uiReducer from "../infrastructure/store/ui/ui.slice";
import podcastsReducer from "../infrastructure/store/podcasts/podcasts.slice";

import type { AppStore, MainState } from "../infrastructure/store";
import { PodcastDTO } from "../infrastructure/store/podcasts/podcast.dto";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<MainState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  state: MainState,
  {
    preloadedState = { ...state },
    store = configureStore({
      reducer: { ui: uiReducer, podcasts: podcastsReducer },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// export function renderHookWithProviders(
//   hook: any,
//   {
//     preloadedState = {},
//     store = configureStore({ reducer: { ui: uiReducer }, preloadedState }),
//     ...renderOptions
//   }: ExtendedRenderOptions = {}
// ) {
//   function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
//     return <Provider store={store}>{children}</Provider>;
//   }
//
//   // Return an object with the store and all of RTL's query functions
//   return { store, ...renderHook(hook, { wrapper: Wrapper, ...renderOptions }) };
// }

const podcasts: PodcastDTO[] = [
  {
    id: "1",
    title: "Podcast 1",
    description: "Podcast 1 description",
    image: "https://picsum.photos/200/300",
    author: "Author 1",
    link: "https://www.google.com",
    episodes: [
      {
        id: 1,
        title: "Episode 1",
        description: "Episode 1 description",
        artist: "Artist 1",
        date: "2021-01-01",
        duration: 1000,
        link: "",
      },
    ],
    lastUpdated: 0,
  },
];

export const initialState: MainState = {
  ui: {
    loading: true,
    filter: "",
  },
  podcasts: {
    entries: [...podcasts],
    isFetching: false,
    lastUpdated: 0,
  },
};
