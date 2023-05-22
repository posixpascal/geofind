import React from "react";
import {Experience, ExperienceValue} from "@/server/constants/exp";
import {useTranslations} from "next-intl";
import {singlePlayerState} from "@/state/singleplayer";
import {useSelector} from "@legendapp/state/react";

interface ExperienceListItemProps {
  type: Experience;
}

export const ExperienceListItem: React.FC<ExperienceListItemProps> = ({
  type,
}) => {
  const singlePlayer = useSelector(() => singlePlayerState.get());
  const t = useTranslations("experience");
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
