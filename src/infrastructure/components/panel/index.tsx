import styles from "./panel.module.scss";
interface PanelProps {
  children?: React.ReactNode;
}

const Panel = ({ children }: PanelProps) => {
  return (
    <div data-testid="panel" className={styles.panel}>
      {children}
    </div>
  );
};

export default Panel;
