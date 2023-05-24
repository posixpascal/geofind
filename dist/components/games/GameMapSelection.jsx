"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameMapSelection = void 0;
const Swipes_1 = require("@/components/controls/Swipes");
const client_1 = require("@prisma/client");
const africa_svg_1 = __importDefault(require("@/assets/svgs/maps/africa.svg"));
const northamerica_svg_1 = __importDefault(require("@/assets/svgs/maps/northamerica.svg"));
const southamerica_svg_1 = __importDefault(require("@/assets/svgs/maps/southamerica.svg"));
const oceania_svg_1 = __importDefault(require("@/assets/svgs/maps/oceania.svg"));
const europe_svg_1 = __importDefault(require("@/assets/svgs/maps/europe.svg"));
const asia_svg_1 = __importDefault(require("@/assets/svgs/maps/asia.svg"));
const world_svg_1 = __importDefault(require("@/assets/svgs/modes/world.svg"));
const GameMapSelection = ({ readOnly, map, setMap, }) => {
    // TODO: type
    const maps = Object.keys(client_1.GameMap);
    const iconMapping = {
        [client_1.GameMap.AFRICA]: <africa_svg_1.default className={"h-[100px] w-[100px]"}/>,
        [client_1.GameMap.WORLD]: <world_svg_1.default className={"h-[100px] w-[100px]"}/>,
        [client_1.GameMap.SOUTH_AMERICA]: (<southamerica_svg_1.default className={"h-[100px] w-[100px]"}/>),
        [client_1.GameMap.ASIA]: <asia_svg_1.default className={"h-[100px] w-[100px]"}/>,
        [client_1.GameMap.EUROPE]: <europe_svg_1.default className={"h-[100px] w-[100px]"}/>,
        [client_1.GameMap.OCEANIA]: <oceania_svg_1.default className={"h-[100px] w-[100px]"}/>,
        [client_1.GameMap.NORTH_AMERICA]: (<northamerica_svg_1.default className={"h-[100px] w-[100px]"}/>),
    };
    return (<div>
      <Swipes_1.Swipes readOnly={readOnly} defaultIndex={maps.findIndex((m) => m === map)} onChange={(index) => setMap(maps[index])} title={"Map"}>
        {maps.map((map) => (<div key={map} className={"flex flex-col mx-2 rounded-xl p-4 items-center justify-center"}>
            {iconMapping[map]}
            <div>{map}</div>
          </div>))}
      </Swipes_1.Swipes>
    </div>);
};
exports.GameMapSelection = GameMapSelection;
