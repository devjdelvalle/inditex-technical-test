import { Link, useNavigation } from "react-router-dom";
import styles from "./header.module.scss";
import LoadingIndicator from "./loadingIndicator";
import { getIsLoading } from "../../store/ui/ui.selectors";
import { useSelector } from "react-redux";

const Header = () => {
  const navigation = useNavigation();
  const loading = navigation.state === "loading" || useSelector(getIsLoading);

  return (
    <div data-testid="header" className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/">Podcaster</Link>
        <LoadingIndicator show={loading} />
      </nav>
    </div>
  );
};

export default Header;
