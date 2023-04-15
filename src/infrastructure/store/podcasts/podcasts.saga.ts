import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  fetchPodcasts,
  setLastUpdate,
  setEntries,
  setIsFetching,
} from "./podcasts.slice";
import { Podcast } from "../../../domain/models/podcast";
import { HttpPodcastsRepository } from "../../http/podcasts/podcasts.http.repository";
import { getLastUpdated } from "./podcasts.selectors";

//const ONE_DAY = 1000 * 60 * 60 * 24;
const ONE_DAY = 1000 * 60;

export function* _fetchPodcasts() {
  const httpPodcastsRepository = new HttpPodcastsRepository();

  const lastUpdated = yield select(getLastUpdated);
  console.log("lastUpdated", lastUpdated);
  if (Date.now() - lastUpdated < ONE_DAY) {
    return;
  }

  try {
    yield put(setIsFetching(true));
    const podcasts: Podcast[] = yield call(
      httpPodcastsRepository.fetchPodcasts.bind(httpPodcastsRepository)
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
