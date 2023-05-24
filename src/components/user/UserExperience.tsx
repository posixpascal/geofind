import { useCurrentUser } from "@/hooks/useCurrentUser";
import { expForCurrentLevel, expLevel, nextExpLevel } from "@/utils/experience";
import React, { useEffect, useMemo, useState } from "react";
import { ProgressBar } from "../controls/ProgressBar";
import { trpc } from "@/utils/trpc";
import {
  animated,
  useChain,
  useSpring,
  useSpringRef,
  useTransition,
} from "@react-spring/web";
import { Experience } from "@/server/constants/exp";
import { ExperienceListItem } from "../achievements/ExperienceListItem";
import { LevelUp } from "../achievements/LevelUp";
import { singlePlayerState } from "@/state/singleplayer";
import type { RoundState } from "@prisma/client";
import { UserAvatar } from "@/components/user/UserAvatar";
import { useSelector } from "@legendapp/state/react";

const LEVEL_UP_ANIMATION_DURATION = 4000;
const TRAIL_HEIGHT = 45;
export const UserExperience = () => {
  const singlePlayer = useSelector(() => singlePlayerState.get());
  const { user } = useCurrentUser();
  const [levelUp, setLevelUp] = useState(false);
  const [trail, setTrail] = useState<Experience[]>([]);
  const [experience, setExperience] = useState(0);

  const innerWidth = typeof window !== "undefined" ? window.innerWidth : 300;
  const innerHeight = typeof window !== "undefined" ? window.innerHeight : 300;

  useEffect(() => {
    if (singlePlayer.roundState === "PREPARED") {
      setLevelUp(false);
      setTrail([]);
    }
  }, [singlePlayer]);

  trpc.session.experience.useSubscription(void 0, {
    onData(data) {
      if (
        (window as any).oldExperience &&
        expLevel((window as any).oldExperience) !== expLevel(data.total)
      ) {
        setLevelUp(true);
      }

      (window as any).oldExperience = data.total;
      setExperience(data.total);
      setTrail(data.trail);
    },
  });

  const nextExpLevelAt: number = useMemo(() => {
    return nextExpLevel(experience);
  }, [experience]);
  const expForLevel: number = useMemo(() => {
    return expForCurrentLevel(expLevel(experience));
  }, [experience]);

  useEffect(() => {
    if (trail.length === 0) {
      return;
    }

    const timer = setTimeout(() => {
      setTrail([]);
    }, LEVEL_UP_ANIMATION_DURATION);

    return () => clearTimeout(timer);
  }, [trail]);

  const springApi = useSpringRef();
  const { background, opacity, left, bottom, width, height } = useSpring({
    ref: springApi,
    from: {
      opacity: 1,
      background: "white",
      height: 75,
      left: 20,
      bottom: 20,
      width: 300,
    },
    to: {
      scale: trail.length ? 1 : 1,
      opacity: levelUp ? 0 : 1,
      height: levelUp
        ? 400
        : trail.length
        ? 75 + trail.length * TRAIL_HEIGHT
        : 75,
      left: 20,
      bottom: 20,
      width: levelUp ? 350 : 300,
    },
  });

  const levelUpApi = useSpringRef();
  const { scale: levelUpScale } = useSpring({
    ref: levelUpApi,
    from: {
      height: 0,
      scale: 0,
    },
    to: {
      scale: levelUp ? 1 : 0,
    },
  });

  const transApi = useSpringRef();
  const transition = useTransition(trail.length ? trail : [], {
    ref: transApi,
    trail: 400 / trail.length,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(
    trail.length
      ? [springApi, transApi, levelUpApi]
      : [levelUpApi, transApi, springApi],
    [levelUp ? 0 : 0.4, levelUp ? 1.2 : 0.6, trail.length ? 0.1 : 0.6]
  );

  if (!user.data) {
    return <div></div>;
  }

  return (
    <div>
      <animated.div
        className={
          "overflow-hidden shadow-lg bg-white dark:bg-slate-900 dark:text-slate-200 bg-opacity-60 backdrop-blur absolute z-10 bottom-5 left-5 flex-col flex rounded-xl"
        }
        style={{
          height,
          width,
          left,
          bottom,
        }}
      >
        <animated.div
          style={{
            opacity,
            height: opacity.interpolate((x) => `${100 * x}%`),
            scale: opacity.interpolate((x) => `${x}`),
          }}
        >
          <div className={"flex p-3 gap-4"}>
            <UserAvatar width={48} height={48} />
            <animated.div style={{ opacity }}>
              <strong>Lvl. {expLevel(experience)}</strong>
              <span className={"text-xs pl-2"}>
                Noch {nextExpLevelAt - experience} Exp
              </span>
              <div>
                <ProgressBar
                  start={expForLevel}
                  current={experience}
                  total={nextExpLevelAt}
                />
              </div>
            </animated.div>
          </div>
        </animated.div>
        <animated.div
          style={{
            transformOrigin: "bottom left",
            opacity: levelUpScale.interpolate((x) => `${x}`),
            height: levelUpScale.interpolate((x) => `${100 * x}%`),
          }}
        >
          <LevelUp
            visible={levelUp}
            experience={experience}
            width={350}
            height={400}
          />
        </animated.div>
        <div className={"flex flex-col px-5 pb-5"}>
          {transition((style, item) => (
            <animated.div style={{ ...style }}>
              <ExperienceListItem type={item} />
            </animated.div>
          ))}
        </div>
      </animated.div>
    </div>
  );
};
