import styles from "./chapter.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPodcast } from "../../store/podcasts/podcasts.slice";
import { useDispatch, useSelector } from "react-redux";
import { getPodcast } from "../../store/podcasts/podcasts.selectors";
import PodcastInfo from "../../components/podcastInfo";
import Panel from "../../components/panel";
import { Episode } from "../../../domain/models/episode";

interface ChapterViewProps {
  testing?: boolean;
}

export const ChapterView = ({ testing = false }: ChapterViewProps) => {
  const dispatch = useDispatch();
  const { podcastId, episodeId } = useParams();
  const podcast = useSelector(getPodcast(podcastId));
  const [episode, setEpisode] = useState<Episode>(
    podcast.episodes.find((episode) => episode.id === parseInt(episodeId))
  );

  useEffect(() => {
    dispatch(fetchPodcast(podcastId));
  }, [podcastId]);

  /* istanbul ignore next */
  if (!testing) {
    useEffect(() => {
      setEpisode(
        podcast.episodes.find((episode) => episode.id === parseInt(episodeId))
      );
    }, [podcast]);
  }

  return (
    <div data-testid="chapter-view" className={styles.container}>
      {podcast && episode && (
        <>
          <div className={styles.sidebar}>
            <PodcastInfo podcast={podcast}></PodcastInfo>
          </div>
          <div className={styles.content}>
            <Panel>
              <p className={styles.title}>{episode.title}</p>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: episode.description }}
              ></div>
              <div className={styles.player}>
                {episode.link && (
                  <audio preload="auto" src={episode.link} controls />
                )}
              </div>
            </Panel>
          </div>
        </>
      )}
    </div>
  );
};

export default ChapterView;
