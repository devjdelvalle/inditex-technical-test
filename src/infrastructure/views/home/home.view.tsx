import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./home.module.scss";
import { fetchPodcasts } from "../../store/podcasts/podcasts.slice";
import {
  getFilteredPodcasts,
  getPodcasts,
} from "../../store/podcasts/podcasts.selectors";
import Cover from "../../components/cover";
import { FILE } from "dns";
import Filter from "../../components/filter";
import { getFilter } from "../../store/ui/ui.selectors";

const Home = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const podcasts = useSelector(getFilteredPodcasts(filter));

  useEffect(() => {
    dispatch(fetchPodcasts());
  }, []);

  return (
    <div>
      <Filter></Filter>
      <div className={styles.grid}>
        {podcasts.map((podcast) => {
          return <Cover key={podcast.id} podcast={podcast} />;
        })}
      </div>
    </div>
  );
};

export default Home;
