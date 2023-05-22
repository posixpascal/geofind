import {useMemo} from "react";
import {singlePlayerState} from "@/state/singleplayer";
import {useSelector} from "@legendapp/state/react";

export const TriesIndicator = () => {
  const singlePlayer = useSelector(() => singlePlayerState.get());

  const trials = useMemo(() => {
    return (
      <div>
        {singlePlayer.trialsForRound} / {singlePlayer.maxTrials}
      </div>
    );
  }, [singlePlayer]);

  return (
    <div
      className={
        "absolute font-impact leading-6 bottom-5 p-4 backdrop-blur bg-opacity-60 bg-white dark:bg-slate-900 dark:text-slate-200 rounded-xl shadow-lg right-5 text-3xl font-black"
      }
    >
      {trials}
    </div>
  );
};
