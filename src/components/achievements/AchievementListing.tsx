import type { Achievement, AchievementMedal } from "@prisma/client";
import { ProgressBar } from "@/components/controls/ProgressBar";
import { useTranslations } from "next-intl";
import { trpc } from "@/utils/trpc";
import { Tile } from "@/components/layout/Tile";
import React from "react";

interface AchievementGroupProps {
  achievement: Achievement;
}

export const AchievementListing: React.FC<AchievementGroupProps> = ({
  achievement,
}) => {
  const t = useTranslations("achievements");
  const progress = trpc.achievements.progress.useQuery(
    {
      achievement: achievement.id,
    },
    {}
  );

  const iconForType: Record<AchievementMedal, string> = {
    CROWN: "👑",
    GEM: "💎",
    RIBBON: "🎀",
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
            {/*<ProgressBar*/}
            {/*    current={progress.data!.progress}*/}
            {/*    total={progress.data!.total}*/}
            {/*    start={0}*/}
            {/*/>*/}
          </div>
        )}
      </Tile>
    </div>
  );
};
