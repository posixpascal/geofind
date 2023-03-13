import { useCurrentUser } from "@/hooks/useCurrentUser";
import Image from "next/image";
import Avatar from "boring-avatars";
import { expForCurrentLevel, expLevel, nextExpLevel } from "@/utils/experience";
import React, { useEffect, useMemo, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { trpc } from "@/utils/trpc";
import {
  animated,
  useChain,
  useSpring,
  useSpringRef,
  useTransition,
} from "@react-spring/web";
import { Experience } from "@/server/constants/exp";
import { ExperienceListItem } from "./ExperienceListItem";

const LEVEL_UP_ANIMATION_DURATION = 4000;
export const UserExperience = () => {
  const { user } = useCurrentUser();
  //const [levelUp, setLevelUp] = useState(false);
  const [trail, setTrail] = useState<Experience[]>([]);
  const [experience, setExperience] = useState(0);

  trpc.session.experience.useSubscription(void 0, {
    onData(data) {
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
  const { background, height } = useSpring({
    ref: springApi,
    from: { background: "white", height: 75 },
    to: {
      scale: trail.length ? 1 : 1,
      height: trail.length ? 75 + trail.length * 30 : 75,
    },
  });

  const transApi = useSpringRef();
  const transition = useTransition(trail.length ? trail : [], {
    ref: transApi,
    trail: 400 / trail.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(trail.length ? [springApi, transApi] : [transApi, springApi], [
    0,
    trail.length ? 0.1 : 0.6,
  ]);

  if (!user.data) {
    return <div></div>;
  }

  return (
    <div>
      <animated.div
        className={
          "shadow-lg bg-white bg-opacity-60 backdrop-blur absolute z-10 bottom-5 left-5 flex-col flex rounded-xl p-3"
        }
        style={{
          height,
        }}
      >
        <div className={"flex gap-4"}>
          {user.data?.isLoggedIn ? (
            <Image
              alt={user.data.name!}
              height={48}
              width={48}
              className="rounded-full"
              src={user.data?.image!}
            />
          ) : (
            <Avatar
              size={48}
              variant={"beam"}
              name={user.data?.name ?? "guest"}
            />
          )}
          <div>
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
          </div>
        </div>
        <div className={"flex flex-col py-2 pb-4"}>
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
