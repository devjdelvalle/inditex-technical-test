import { call, put, take, takeEvery, select } from "redux-saga/effects";
import {
  fetchPodcasts,
  fetchPodcast,
  setLastUpdate,
  setEntries,
  setIsFetching,
  setPodcastDetails,
} from "./podcasts.slice";
import { Podcast } from "../../../domain/models/podcast";
import { HttpPodcastsRepository } from "../../http/podcasts/podcasts.http.repository";
import { getLastUpdated, getPodcast } from "./podcasts.selectors";
import { setLoading } from "../ui/ui.slice";
import { Episode } from "../../../domain/models/episode";

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
    yield put(setLoading(true));
    yield put(setIsFetching(true));
    const podcasts: Podcast[] = yield call(
      httpPodcastsRepository.fetchPodcasts.bind(httpPodcastsRepository)
    );

    yield put(setEntries(podcasts));
    yield put(setLastUpdate(Date.now()));
    yield put(setIsFetching(false));
    yield put(setLoading(false));
  } catch (err) {
    // TODO: Launch an action to indicate the error
    //yield put(errorFetchingPodcasts());
    console.log(err);
  }
}

export function* _fetchPodcast(action) {
  const httpPodcastsRepository = new HttpPodcastsRepository();
  const podcast = yield select(getPodcast(action.payload));

  if (podcast && Date.now() - podcast.lastUpdated < ONE_DAY) {
    return;
  }

  try {
    yield put(setLoading(true));
    yield put(setIsFetching(true));
    const episodes: Episode[] = yield call(
      httpPodcastsRepository.fetchPodcastEpisodes.bind(httpPodcastsRepository),
      podcast.id
    );

    yield put(setPodcastDetails({ ...podcast, episodes }));

    // yield put(setEntries(podcasts));
    // yield put(setLastUpdate(Date.now()));
    yield put(setIsFetching(false));
    yield put(setLoading(false));
  } catch (err) {
    // TODO: Launch an action to indicate the error
    //yield put(errorFetchingPodcasts());
    console.log(err);
  }
}

export default function* podcastsSaga() {
  yield takeEvery(fetchPodcasts.type, _fetchPodcasts);
  yield takeEvery(fetchPodcast.type, _fetchPodcast);
}
