import type { MultiPlayerGame } from "@prisma/client";
import { multiPlayerState } from "@/state/multiplayer";
import { useTranslations } from "next-intl";
import { useSelector } from "@legendapp/state/react";
import { Toggle } from "../ui/Toggle";

interface GameSettingsSelectionProps {
  updateAction: (key: keyof MultiPlayerGame) => (newValue: boolean) => void;
  readOnly: boolean;
}

interface GameSetting {
  emoji?: string;
  key: keyof MultiPlayerGame;
}

export const GameSettings: React.FC<GameSettingsSelectionProps> = ({
  readOnly,
  updateAction,
}) => {
  const t = useTranslations("settings");
  const multiPlayer = useSelector(() => multiPlayerState.get());

  const settings: Array<GameSetting> = [
    {
      key: "isPublic",
    },
    {
      key: "onlyDirectSpots",
    },
    {
      key: "firstSpotWins",
    },
    {
      key: "hasIslands",
    },
  ];

  return (
    <div className={"flex flex-col py-4 gap-4"}>
      {settings.map((setting) => (
        <Toggle
          key={setting.key}
          readOnly={readOnly}
          icon={t(`games.${setting.key}.emoji`)}
          title={t(`games.${setting.key}.title`)}
          description={t(`games.${setting.key}.description`)}
          checked={!!multiPlayer[setting.key]}
          onChange={updateAction(setting.key)}
        />
      ))}

      {/*<div className={'flex justify-between'}>*/}
      {/*    <div>With islands?</div>*/}
      {/*    <Checkbox onChange={updateAction(} defaultChecked={isPublic}/>*/}
      {/*</div>*/}
    </div>
  );
};
