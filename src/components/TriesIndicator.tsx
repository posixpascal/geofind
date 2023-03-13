import { useMemo } from "react";
import { useRecoilState } from "recoil";
import { singlePlayerState } from "@/state/singleplayer";

export const TriesIndicator = () => {
  const [singlePlayer] = useRecoilState(singlePlayerState);

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
        "absolute font-impact leading-6 bottom-5 p-4 backdrop-blur bg-opacity-60 bg-white rounded-xl shadow-lg right-5 text-3xl font-black"
      }
    >
      {trials}
    </div>
  );
};
