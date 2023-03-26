import React from "react";
import { Experience, ExperienceValue } from "@/server/constants/exp";
import { useTranslation } from "next-i18next";
import { useRecoilState } from "recoil";
import { singlePlayerState } from "@/state/singleplayer";

interface ExperienceListItemProps {
  type: Experience;
}

export const ExperienceListItem: React.FC<ExperienceListItemProps> = ({
  type,
}) => {
  const [singlePlayer] = useRecoilState(singlePlayerState);
  const { t } = useTranslation("experience");
  let amount = ExperienceValue[type];

  return (
    <div className={"flex py-2 justify-between"}>
      {t(`experiences.${type}`, {
        emoji: singlePlayer.country?.flagEmoji,
        name: singlePlayer.country?.nameCommon,
      })}
      <strong className={"text-right"}>+ {amount} Exp</strong>
    </div>
  );
};
