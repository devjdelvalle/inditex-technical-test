import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchPodcasts,
  setLastUpdate,
  setEntries,
  setIsFetching,
} from "./podcasts.slice";
import { Podcast } from "../../../domain/models/podcast";
import { HttpPodcastsRepository } from "../../http/podcasts/podcasts.http.repository";

export function* _fetchPodcasts() {
  const repository = new HttpPodcastsRepository();
  try {
    yield put(setIsFetching(true));
    const podcasts: Podcast[] = yield call(
      repository.fetchPodcasts.bind(repository)
    );
    yield put(setEntries(podcasts));
    yield put(setLastUpdate(Date.now()));
    yield put(setIsFetching(false));
  } catch (err) {
    // TODO: Launch an action to indicate the error
    //yield put(errorFetchingPodcasts());
    console.log(err);
  }
}

export default function* podcastsSaga() {
  yield takeEvery(fetchPodcasts.type, _fetchPodcasts);
}
