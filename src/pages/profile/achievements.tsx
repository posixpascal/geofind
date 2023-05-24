import { LocaleName } from "../../../types";
import { trpc } from "@/utils/trpc";
import type { Achievement } from "@prisma/client";
import { AchievementGroup } from "@/components/achievements/AchievementGroup";
import React from "react";
import { SpottedCountriesMap } from "@/components/achievements/SpottedCountriesMap";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { useTranslations } from "next-intl";
import { pick } from "next/dist/lib/pick";

export default function ProfileAchievementsPage() {
  const t = useTranslations("achievements");
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
    <Container>
      <PageHeader
        title={t("countriesTitle")}
        description={t("countriesDescription", { found: 0, total: 241 })}
      />
      <div
        className={
          "relative min-h-[550px] bg-[#d8f2ff] rounded-xl shadow-lg overflow-hidden"
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
    </Container>
  );
}

const namespaces = ["common", "menu", "achievements"];
export const getServerSideProps = async ({
  locale,
}: {
  locale: LocaleName;
}) => {
  return {
    props: {
      messages: pick(
        (await import(`../../../public/locales/${locale ?? "en"}.json`))
          .default,
        namespaces
      ),
    },
  };
};
