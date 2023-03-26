import { Achievement, AchievementMedal } from "@prisma/client";
import CrownIcon from "@/assets/svgs/icons/crown.svg";
import RibbonIcon from "@/assets/svgs/icons/ribbon.svg";
import GemIcon from "@/assets/svgs/icons/gem.svg";
import { ProgressBar } from "@/components/ProgressBar";
import { useTranslation } from "next-i18next";
import { trpc } from "@/utils/trpc";
import { Tile } from "@/components/Tile";
import Link from "next/link";
import React from "react";

interface AchievementGroupProps {
  achievement: Achievement;
}

export const AchievementListing: React.FC<AchievementGroupProps> = ({
  achievement,
}) => {
  const { t } = useTranslation("achievements");
  const progress = trpc.achievements.progress.useQuery({
    achievement: achievement.id,
  });

  const iconForType = {
    [AchievementMedal.CROWN]: "👑",
    [AchievementMedal.GEM]: "💎",
    [AchievementMedal.RIBBON]: "🎀",
  };

  const icon = iconForType[achievement.medal];

  if (progress.isLoading || !progress.data) {
    return <div></div>;
  }

  const awarded = progress.data!.awarded;

  return (
    <div className={`h-full ${awarded ? "" : "grayscale"}`}>
      <Tile
        title={t(achievement.type + "." + achievement.name + ".title")}
        content={t(achievement.type + "." + achievement.name + ".description")}
        icon={icon}
      >
        {awarded && (
          <div className={"pt-4"}>
            <ProgressBar current={255} total={255} start={0} />
          </div>
        )}

        {!awarded && (
          <div className={"pt-4"}>
            <ProgressBar
              current={progress.data!.progress}
              total={progress.data!.total}
              start={0}
            />
          </div>
        )}
      </Tile>
    </div>
  );
};
