import styles from "./details.module.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchPodcast } from "../../store/podcasts/podcasts.slice";
import { useDispatch, useSelector } from "react-redux";
import { getPodcast } from "../../store/podcasts/podcasts.selectors";
import PodcastInfo from "../../components/podcastInfo";
import Panel from "../../components/panel";
import { Podcast } from "../../../domain/models/podcast";

export const DetailsView = () => {
  const dispatch = useDispatch();
  const { podcastId } = useParams();
  const podcast = useSelector(getPodcast(podcastId));

  useEffect(() => {
    dispatch(fetchPodcast(podcastId));
  }, [podcastId]);

  if (!podcast)
    return <div data-testid="details-view" className={styles.container}></div>;

  return (
    <div data-testid="details-view" className={styles.container}>
      <div className={styles.sidebar}>
        <PodcastInfo podcast={podcast}></PodcastInfo>
      </div>
      <div className={styles.content}>
        <Panel>
          <p>Episodes: {podcast.episodes.length}</p>
        </Panel>
        <Panel>
          <ul>
            <li className={styles.tableheader}>
              <p>Título</p>
              <div className={styles.metadata}>
                <p>Fecha</p>
                <p>Duración</p>
              </div>
            </li>
            {podcast.episodes.map((episode) => (
              <li key={episode.id}>
                <Link to="#">{episode.title}</Link>
                <div className={styles.metadata}>
                  <p>{episode.shortDate}</p>
                  <p>{episode.durationInMinutes}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
};

export default DetailsView;
