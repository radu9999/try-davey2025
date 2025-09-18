import * as Progress from "@radix-ui/react-progress";
import React from "react";

interface ProgressBarProps {
  value: number;
  totalValue: number;
}

const ProgressBar = ({ value, totalValue }: ProgressBarProps) => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const progress = (value / totalValue) * 100;

    const timer = setTimeout(() => setProgress(progress), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Progress.Root
      className="relative overflow-hidden bg-primary-1 rounded-full w-full h-2 mt-1"
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: "translateZ(0)",
      }}
      value={progress}
    >
      <Progress.Indicator
        className="bg-primary-2 rounded-lg w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;
