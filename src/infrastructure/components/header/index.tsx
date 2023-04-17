import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import LoadingIndicator from "./loadingIndicator";
import { getIsLoading } from "../../store/ui/ui.selectors";
import { useSelector } from "react-redux";

const Header = ({ isLoading = false }: any) => {
  const loading = isLoading || useSelector(getIsLoading);

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
