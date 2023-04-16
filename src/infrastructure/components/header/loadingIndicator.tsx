interface LoadingIndicatorProps {
  show: boolean;
}

const LoadingIndicator = ({ show }: LoadingIndicatorProps) => {
  return (
    <div data-testid="loading-indicator">{show && <span>Loading...</span>}</div>
  );
};

export default LoadingIndicator;
