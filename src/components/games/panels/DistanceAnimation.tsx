import {useEffect, useState} from "react";

interface DistanceAnimationProps {
  distance: number;
}

const useCountUp = (to: number, duration = 300) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count >= to) {
      return;
    }

    let timer = setInterval(() => {
      setCount((count) => count + to / duration);
    }, duration / to);
    return () => clearInterval(timer);
  }, [count]);

  return Math.min(to, count);
};

export const DistanceAnimation: React.FC<DistanceAnimationProps> = ({
  distance,
}) => {
  const distanceCounter = useCountUp(distance);

  return (
    <div className={"text-center"}>
      Du bist ca.{" "}
      <span className={"font-bold"}>{distanceCounter.toFixed(2)}km</span>{" "}
      entfernt
    </div>
  );
};
