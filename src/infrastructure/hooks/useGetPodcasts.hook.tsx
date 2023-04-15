import { useSelector } from "react-redux";
import { getLastUpdated } from "../store/ui.selectors";

const ONE_DAY = 1000 * 60 * 60 * 24;

export const useGetPodcasts = () => {
  const lastUpdate = useSelector(getLastUpdated);

  if (Date.now() - lastUpdate > ONE_DAY) {
    return [];
  }

  return [];
};
