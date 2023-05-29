import { Swipes } from "@/components/ui/Swipes";
import { GameMode } from "@prisma/client";
import WorldIcon from "@/assets/svgs/modes/world.svg";
import CapitalsIcon from "@/assets/svgs/modes/capitals.svg";
import FlagsIcon from "@/assets/svgs/modes/flags.svg";
import AnimalsIcon from "@/assets/svgs/modes/animals.svg";

import { ReactNode } from "react";

interface GameModeSelectionProps {
  mode: string;
  setMode: (mode: string) => void;
  readOnly: boolean;
}

export const ModeSelection: React.FC<GameModeSelectionProps> = ({
  readOnly = false,
  mode,
  setMode,
}) => {
  // TODO: type
  const modes = [
    GameMode.WORLD,
    GameMode.CAPITALS,
    GameMode.FLAGS,
    GameMode.ANIMALS,
  ];

  const iconMapping: Record<string, ReactNode> = {
    [GameMode.WORLD]: <WorldIcon className={"h-[100px] w-[100px]"} />,
    [GameMode.CAPITALS]: <CapitalsIcon className={"h-[100px] w-[100px]"} />,
    [GameMode.FLAGS]: <FlagsIcon className={"h-[100px] w-[100px]"} />,
    [GameMode.ANIMALS]: <AnimalsIcon className={"h-[100px] w-[100px]"} />,
  };

  return (
    <div>
      <Swipes
        readOnly={readOnly}
        defaultSlide={modes.findIndex((m) => m === mode)}
        onChange={(index) => setMode(modes[index])}
        title={"Mode"}
      >
        {modes.map((mode) => (
          <div
            key={mode}
            className={
              "flex flex-col mx-2 rounded-xl p-4 items-center justify-center"
            }
          >
            {iconMapping[mode]}
            <div>{mode}</div>
          </div>
        ))}
      </Swipes>
    </div>
  );
};
