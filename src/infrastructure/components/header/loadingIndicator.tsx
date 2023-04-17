import { ThreeCircles } from "react-loader-spinner";

interface LoadingIndicatorProps {
  show: boolean;
}

const LoadingIndicator = ({ show }: LoadingIndicatorProps) => {
  return (
    <div data-testid="loading-indicator">
      {show && (
        <div>
          <ThreeCircles
            height="20"
            width="20"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
      )}
    </div>
  );
};

export default LoadingIndicator;
