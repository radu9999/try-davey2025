import React, { useEffect, useState } from "react";
import { QuizQuestion } from "@/api/modernCommuneApi";

type CountdownTimerProps = {
  timeInSeconds: number;
  onTimerEnd: () => void;
  data: QuizQuestion[] | undefined;
  isPaused: boolean;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  timeInSeconds,
  onTimerEnd,
  data,
  isPaused,
}) => {
  const [timeLeft, setTimeLeft] = useState(timeInSeconds);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (!isPaused) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval as NodeJS.Timeout);
            onTimerEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, onTimerEnd, timeInSeconds]);

  useEffect(() => {
    setTimeLeft(timeInSeconds);
  }, [timeInSeconds, data]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return <div className="text-red-700 w-24">{formatTime(timeLeft)}</div>;
};

export default CountdownTimer;
