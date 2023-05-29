import type { Achievement, AchievementType } from "@prisma/client";
import React from "react";
import { AchievementList } from "@/components/user-achievements/AchievementList";
import { useTranslations } from "next-intl";
import { animated, useTransition } from "@react-spring/web";
import { PageHeader } from "@/components/layout/PageHeader";

interface AchievementGroupProps {
  type: AchievementType;
  achievements: Achievement[];
}

export const AchievementGroup: React.FC<AchievementGroupProps> = ({
  type,
  achievements,
}) => {
  const t = useTranslations("achievements");

  const transition = useTransition(achievements.length ? achievements : [], {
    trail: 1500 / achievements.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  const minHeight = Math.ceil(achievements.length / 3) * 180 + "px";

  return (
    <>
      <PageHeader title={t("groups." + type)} description={""} />
      <div className={"grid grid-cols-3 gap-6"} style={{ minHeight }}>
        {transition((style, achievement) => (
          <animated.div style={{ ...style }}>
            <AchievementList
              achievement={achievement}
              key={achievement.id}
            />
          </animated.div>
        ))}
      </div>
    </>
  );
};
