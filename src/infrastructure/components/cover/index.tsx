import React from "react";
import styles from "./cover.module.scss";
import { Podcast } from "../../../domain/models/podcast";

interface CoverProps {
  podcast: Podcast;
}

const Cover = ({ podcast }: CoverProps) => {
  return (
    <div className={styles.cover} data-testid={`cover-${podcast.id}`}>
      <img src={podcast.image} alt={podcast.title} />
      <p className={styles.title}>{podcast.title}</p>
      <p className={styles.author}>{podcast.author}</p>
    </div>
  );
};

export default Cover;
