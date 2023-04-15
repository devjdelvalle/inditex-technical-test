import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  PreloadedState,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { useDispatch } from "react-redux";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";
import uiReducer from "./ui/ui.slice";
import podcastsReducer from "./podcasts/podcasts.slice";
import podcastsSaga from "./podcasts/podcasts.saga";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel1,
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
