import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { useDispatch } from "react-redux";
import { persistReducer, persistStore } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import uiReducer from "./ui/ui.slice";
import podcastsReducer from "./podcasts/podcasts.slice";
import podcastsSaga from "./podcasts/podcasts.saga";
import autoMergeLevel1 from "reduxjs-toolkit-persist/es/stateReconciler/autoMergeLevel1";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel1,
  whitelist: ["podcasts"],
  timeout: 2000,
};

const mainReducer = combineReducers({
  ui: uiReducer,
  podcasts: podcastsReducer,
});
const _persistedReducer = persistReducer(persistConfig, mainReducer);

const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
  reducer: _persistedReducer,
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

export const persistor = persistStore(store);
