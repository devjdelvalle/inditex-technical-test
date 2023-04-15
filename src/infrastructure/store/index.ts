import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { useDispatch } from "react-redux";
import uiReducer from "./ui/ui.slice";
import podcastsReducer from "./podcasts/podcasts.slice";
import podcastsSaga from "./podcasts/podcasts.saga";

const mainReducer = combineReducers({
  ui: uiReducer,
  podcasts: podcastsReducer,
});

const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
  reducer: mainReducer,
  middleware: [sagaMiddleWare],
});

export const setupStore = (preloadedState?: PreloadedState<MainState>) => {
  return store;
};

sagaMiddleWare.run(podcastsSaga);

export type MainState = ReturnType<typeof mainReducer>;

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch: () => AppDispatch = useDispatch;
