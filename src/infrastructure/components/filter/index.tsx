import styles from "./filter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../store/ui/ui.slice";
import { useEffect, useState } from "react";
import { getFilter } from "../../store/ui/ui.selectors";
import { getFilteredPodcasts } from "../../store/podcasts/podcasts.selectors";

const Filter = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState(useSelector(getFilter));
  const results = useSelector(getFilteredPodcasts(text)).length;

  useEffect(() => {
    dispatch(setFilter(text));
  }, [text]);

  const handleFilterChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className={styles.filter} data-testid="filter">
      <span>{results}</span>
      <input
        data-testid="filter-input"
        value={text}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;
