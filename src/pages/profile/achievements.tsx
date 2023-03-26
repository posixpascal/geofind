import { LocaleName } from "../../../types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { trpc } from "@/utils/trpc";
import { Achievement } from "@prisma/client";
import { AchievementGroup } from "@/components/AchievementGroup";
import React, { useState } from "react";
import { Map } from "@/components/Map";
import { SpottedCountriesMap } from "@/components/SpottedCountriesMap";

export default function ProfileAchievementsPage() {
  const [map, setMap] = useState<any>(null);
  const achievements = trpc.achievements.all.useQuery();

  if (achievements.isLoading) {
    return <div>Loading...</div>;
  }

  if (!achievements.data) {
    return <div>Something went wrong</div>;
  }

  const allAchievements: Achievement[] = achievements.data;

  const groups = Array.from(
    new Set(allAchievements.map((achievement) => achievement.type))
  );

  return (
    <div>
      <h2 className={"text-3xl font-black dark:text-slate-200 pb-3"}>Gefundene Länder</h2>
      <div
        className={
          "relative min-h-[350px] bg-[#d8f2ff] rounded-xl shadow-lg overflow-hidden"
        }
      >
        <SpottedCountriesMap />
      </div>
      <div className={"pt-8"}>
        {groups.map((group) => (
          <AchievementGroup
            type={group}
            achievements={allAchievements.filter(({ type }) => type === group)}
            key={group}
          />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async ({
  locale,
}: {
  locale: LocaleName;
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "menu",
        "achievements",
      ])),
    },
  };
};
