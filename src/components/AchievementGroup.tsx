import { Achievement, AchievementType } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import { AchievementListing } from "@/components/AchievementListing";
import { useTranslation } from "next-i18next";
import { animated, useSpringRef, useTransition } from "@react-spring/web";
import { ExperienceListItem } from "@/components/ExperienceListItem";
import { useIntersection } from "react-use";
import { Headline } from "./Headline";

interface AchievementGroupProps {
  type: AchievementType;
  achievements: Achievement[];
}

export const AchievementGroup: React.FC<AchievementGroupProps> = ({
  type,
  achievements,
}) => {
  const { t } = useTranslation("achievements");

  const transition = useTransition(achievements.length ? achievements : [], {
    trail: 1500 / achievements.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  const minHeight = Math.ceil(achievements.length / 3) * 180 + "px";

  return (
    <div className={"pb-8 mt-8"}>
      <Headline size={'h2'}>{t("groups." + type)}</Headline>
      <div className={"grid grid-cols-3 gap-6"} style={{ minHeight }}>
        {transition((style, achievement) => (
          <animated.div style={{ ...style }}>
            <AchievementListing
              achievement={achievement}
              key={achievement.id}
            />
          </animated.div>
        ))}
      </div>
    </div>
  );
};
