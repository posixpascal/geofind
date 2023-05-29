import { Swipes } from "@/components/ui/Swipes";
import { GameMap } from "@prisma/client";
import AfricaMap from "@/assets/svgs/maps/africa.svg";
import NorthAmericaMap from "@/assets/svgs/maps/northamerica.svg";
import SouthAmericaMap from "@/assets/svgs/maps/southamerica.svg";
import OceaniaMap from "@/assets/svgs/maps/oceania.svg";
import EuropeMap from "@/assets/svgs/maps/europe.svg";
import AsiaMap from "@/assets/svgs/maps/asia.svg";
import WorldMap from "@/assets/svgs/modes/world.svg";

import { ReactNode } from "react";

interface GameMapSelectionProps {
  map: string;
  setMap: (map: string) => void;
  readOnly: boolean;
}

export const MapSelection: React.FC<GameMapSelectionProps> = ({
  readOnly,
  map,
  setMap,
}) => {
  // TODO: type
  const maps: Array<keyof typeof GameMap> = Object.keys(
    GameMap
  ) as unknown as Array<keyof typeof GameMap>;
  const iconMapping: Record<keyof typeof GameMap, ReactNode> = {
    [GameMap.AFRICA]: <AfricaMap className={"h-[100px] w-[100px]"} />,
    [GameMap.WORLD]: <WorldMap className={"h-[100px] w-[100px]"} />,
    [GameMap.SOUTH_AMERICA]: (
      <SouthAmericaMap className={"h-[100px] w-[100px]"} />
    ),
    [GameMap.ASIA]: <AsiaMap className={"h-[100px] w-[100px]"} />,
    [GameMap.EUROPE]: <EuropeMap className={"h-[100px] w-[100px]"} />,
    [GameMap.OCEANIA]: <OceaniaMap className={"h-[100px] w-[100px]"} />,
    [GameMap.NORTH_AMERICA]: (
      <NorthAmericaMap className={"h-[100px] w-[100px]"} />
    ),
  };

  return (
    <div>
      <Swipes
        readOnly={readOnly}
        defaultSlide={maps.findIndex((m) => m === map)}
        onChange={(index) => setMap(maps[index])}
        title={"Map"}
      >
        {maps.map((map) => (
          <div
            key={map}
            className={
              "flex flex-col mx-2 rounded-xl p-4 items-center justify-center"
            }
          >
            {iconMapping[map]}
            <div>{map}</div>
          </div>
        ))}
      </Swipes>
    </div>
  );
};
