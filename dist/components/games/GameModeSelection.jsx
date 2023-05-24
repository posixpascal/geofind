"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModeSelection = void 0;
const Swipes_1 = require("@/components/controls/Swipes");
const client_1 = require("@prisma/client");
const world_svg_1 = __importDefault(require("@/assets/svgs/modes/world.svg"));
const capitals_svg_1 = __importDefault(require("@/assets/svgs/modes/capitals.svg"));
const flags_svg_1 = __importDefault(require("@/assets/svgs/modes/flags.svg"));
const animals_svg_1 = __importDefault(require("@/assets/svgs/modes/animals.svg"));
const GameModeSelection = ({ readOnly = false, mode, setMode, }) => {
    // TODO: type
    const modes = [
        client_1.GameMode.WORLD,
        client_1.GameMode.CAPITALS,
        client_1.GameMode.FLAGS,
        client_1.GameMode.ANIMALS,
    ];
    const iconMapping = {
        [client_1.GameMode.WORLD]: <world_svg_1.default className={"h-[100px] w-[100px]"}/>,
        [client_1.GameMode.CAPITALS]: <capitals_svg_1.default className={"h-[100px] w-[100px]"}/>,
        [client_1.GameMode.FLAGS]: <flags_svg_1.default className={"h-[100px] w-[100px]"}/>,
        [client_1.GameMode.ANIMALS]: <animals_svg_1.default className={"h-[100px] w-[100px]"}/>,
    };
    return (<div>
      <Swipes_1.Swipes readOnly={readOnly} defaultIndex={modes.findIndex((m) => m === mode)} onChange={(index) => setMode(modes[index])} title={"Mode"}>
        {modes.map((mode) => (<div key={mode} className={"flex flex-col mx-2 rounded-xl p-4 items-center justify-center"}>
            {iconMapping[mode]}
            <div>{mode}</div>
          </div>))}
      </Swipes_1.Swipes>
    </div>);
};
exports.GameModeSelection = GameModeSelection;
