import styles from "./podcastInfo.module.scss";
import { Podcast } from "../../../domain/models/podcast";
import React from "react";
import { Link } from "react-router-dom";

interface PodcastInfoProps {
  podcast: Podcast;
}

const PodcastInfo = ({ podcast }: PodcastInfoProps) => {
  return (
    <div data-testid="podcast-info" className={styles.info}>
      <Link to={`/podcast/${podcast.id}`}>
        <div>
          <img src={podcast.image} alt={podcast.title} />
        </div>
      </Link>{" "}
      <Link to={`/podcast/${podcast.id}`}>
        <div>
          <p className={styles.title}>{podcast.title}</p>
          <p className={styles.author}>by {podcast.author}</p>
        </div>
      </Link>
      <div>
        <p className={styles.title}>Description:</p>
        <p className={styles.description}>{podcast.author}</p>
      </div>
    </div>
  );
};

export default PodcastInfo;
