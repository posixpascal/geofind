import {useEffect, useState} from "react";

export const useCountUp = (to: number, duration = 300) => {
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