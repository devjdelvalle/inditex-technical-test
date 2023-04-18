import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  fetchPodcasts,
  fetchPodcast,
  setLastUpdate,
  setEntries,
  setIsFetching,
} from "./podcasts.slice";
import { Podcast } from "../../../domain/models/podcast";
import { HttpPodcastsRepository } from "../../http/podcasts/podcasts.http.repository";
import { setLoading } from "../ui/ui.slice";
import { Episode } from "../../../domain/models/episode";

const ONE_DAY = 1000 * 60 * 60 * 24;

export function* _fetchPodcasts() {
  const httpPodcastsRepository = new HttpPodcastsRepository();
  const lastUpdated = parseInt(localStorage.getItem("lastUpdate"));

  try {
    yield put(setLoading(true));
    yield put(setIsFetching(true));

    if (lastUpdated && Date.now() - lastUpdated < ONE_DAY) {
      const podcasts: Podcast[] = JSON.parse(localStorage.getItem("podcasts"));
      yield put(setEntries(podcasts));

      return;
    }

    const podcasts: Podcast[] = yield call(
      httpPodcastsRepository.fetchPodcasts.bind(httpPodcastsRepository)
    );

    const now = Date.now();
    localStorage.setItem("podcasts", JSON.stringify(podcasts));
    localStorage.setItem("lastUpdate", "" + now);
    yield put(setEntries(podcasts));
    yield put(setLastUpdate(now));
    yield put(setLoading(false));
  } catch (err) {
    // TODO: Launch an action to indicate the error
    //yield put(errorFetchingPodcasts());
    console.log(err);
  } finally {
    yield put(setIsFetching(false));
    yield put(setIsFetching(false));
  }
}

export function* _fetchPodcast(action) {
  const httpPodcastsRepository = new HttpPodcastsRepository();
  const podcasts = JSON.parse(localStorage.getItem("podcasts") || "[]");
  const podcast = podcasts.find(({ id }) => id === action.payload);

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

    podcast.episodes = episodes;
    podcast.lastUpdated = Date.now();
    localStorage.setItem("podcasts", JSON.stringify(podcasts));
    yield put(setEntries(podcasts));

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
