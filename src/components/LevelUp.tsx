import Confetti from "react-confetti";
import React, { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { expLevel } from "@/utils/experience";
import { animated, useSpring } from "@react-spring/web";
import { IconButton } from "@/components/IconButton";

interface LevelUpProps {
  width: number;
  height: number;
  experience: number;
  visible: boolean;
}

export const LevelUp: React.FC<LevelUpProps> = ({
  visible,
  experience,
  width,
  height,
}) => {
  const { user } = useCurrentUser();
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (visible) {
      setTimeout(() => setConfetti(true), 2400);
    }
    return () => timer && clearTimeout(timer);
  }, [visible]);

  const newLevel = expLevel(experience);
  const oldLevel = newLevel - 1;

  const { top, bottom } = useSpring({
    from: {
      top: 0,
      bottom: 150,
    },
    to: {
      top: visible ? -150 : 0,
      bottom: visible ? 0 : 150,
    },
    delay: 2400,
  });

  return (
    <div>
      {confetti && (
        <div className={"absolute inset-0 z-5"}>
          <Confetti
            gravity={0.01}
            opacity={0.25}
            numberOfPieces={80}
            width={width}
            height={height}
          />
        </div>
      )}

      <div className={"gap-2 flex flex-col p-7"}>
        <animated.div>
          <div className={"text-center text-4xl font-black"}>Glückwunsch!</div>
          <div className={"text-center mt-2 text-2xl"}>
            Du hast ein neues Level erreicht:
          </div>
        </animated.div>
        <div>
          <div
            className={
              "flex-col font-bold relative overflow-hidden w-full h-[120px] flex items-center justify-center"
            }
          >
            <animated.div
              style={{
                top,
              }}
              className={"absolute"}
            >
              <h1 className={"text-9xl"}>{oldLevel}</h1>
            </animated.div>
            <animated.div
              style={{
                top: bottom,
              }}
              className={"absolute"}
            >
              <h1 className={"text-9xl"}>{newLevel}</h1>
            </animated.div>
          </div>
          <div className={"text-gray-500 text-sm uppercase text-center"}>
            Level
          </div>
        </div>
        <div className={"flex mt-4 flex-col justify-center items-center gap-4"}>
          <div>
            <IconButton variant={"primary"}>Erfolge ansehen</IconButton>
          </div>
          {/*<div>*/}
          {/*    <IconButton variant={'positive'}>*/}
          {/*        Weiterspielen*/}
          {/*    </IconButton>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};
