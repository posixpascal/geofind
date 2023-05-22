import {Checkbox} from "@/components/controls/Checkbox";
import {MultiPlayerGame} from "@prisma/client";
import {multiPlayerState} from "@/state/multiplayer";
import {useTranslations} from "next-intl";
import {useSelector} from "@legendapp/state/react";

interface GameSettingsSelectionProps {
  updateAction: (key: keyof MultiPlayerGame) => (newValue: boolean) => void;
  readOnly: boolean;
}

interface GameSetting {
  emoji?: string;
  key: keyof MultiPlayerGame;
}

export const GameSettingsSelection: React.FC<GameSettingsSelectionProps> = ({
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
        <div
          key={setting.key}
          className={`flex justify-between bg-background/50 rounded-xl p-4 transition-opacity ${
            readOnly && !multiPlayer[setting.key] ? "opacity-50" : ""
          }`}
        >
          <div className={"text-5xl pr-4"}>
            {t(`games.${setting.key}.emoji`)}
          </div>
          <div className={"flex-grow"}>
            <strong className={"block"}>
              {t(`games.${setting.key}.title`)}
            </strong>
            <p>{t(`games.${setting.key}.description`)}</p>
          </div>
          <Checkbox
            onChange={updateAction(setting.key)}
            checked={!!multiPlayer[setting.key]}
          />
        </div>
      ))}

      {/*<div className={'flex justify-between'}>*/}
      {/*    <div>With islands?</div>*/}
      {/*    <Checkbox onChange={updateAction(} defaultChecked={isPublic}/>*/}
      {/*</div>*/}
    </div>
  );
};
