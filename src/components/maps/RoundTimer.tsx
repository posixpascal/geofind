import { useSelector } from "@legendapp/state/react";
import { multiPlayerState } from "@/state/multiplayer";
import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { RoundState } from "@prisma/client";

export const RoundTimer = () => {
  const multiPlayer = useSelector(() => multiPlayerState.get());
  const [seconds, setSeconds] = useState(multiPlayer.roundTime);

  useEffect(() => {
    let interval = setInterval(() => {
      const secondsRemaining =
        multiPlayer.roundTime -
        (+new Date() - +multiPlayer.roundStartedAt) / 1000;
      setSeconds(() => Math.max(0, Math.round(secondsRemaining)));
    }, 800);

    return () => clearInterval(interval);
  }, [multiPlayer.roundStartedAt]);

  const [style] = useSpring(
    {
      right:
        seconds > 0 && multiPlayer.roundState === RoundState.STARTED
          ? 10
          : -200,
      bottom:
        seconds > 0 && multiPlayer.roundState === RoundState.STARTED
          ? 10
          : -200,
      delay: 400,
    },
    [seconds, multiPlayer.roundState]
  );

  return (
    <animated.div
      style={style}
      className={
        "absolute font-impact leading-6 bottom-5 p-4 backdrop-blur bg-opacity-60 bg-white dark:bg-slate-900 dark:text-slate-200 rounded-xl shadow-lg right-5 text-3xl font-black"
      }
    >
      <span className={seconds <= 3 ? "text-red-500" : ""}>{seconds}</span>
    </animated.div>
  );
};
