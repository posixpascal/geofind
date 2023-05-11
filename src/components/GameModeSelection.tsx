import {Swipes} from "@/components/Swipes";
import {GameMap, GameMode} from "@prisma/client";
import WorldIcon from "@/assets/svgs/modes/world.svg";
import CapitalsIcon from "@/assets/svgs/modes/capitals.svg";
import FlagsIcon from "@/assets/svgs/modes/flags.svg";
import AnimalsIcon from "@/assets/svgs/modes/animals.svg";

import {ReactNode} from "react";

export const GameModeSelection = () => {
    // TODO: type
    const modes = [
        GameMode.WORLD,
        GameMode.CAPITALS,
        GameMode.FLAGS,
        GameMode.ANIMALS
    ];

    const iconMapping: Record<string, ReactNode> = {
        [GameMode.WORLD]: <WorldIcon className={'h-[100px] w-[100px]'}/>,
        [GameMode.CAPITALS]: <CapitalsIcon className={'h-[100px] w-[100px]'}/>,
        [GameMode.FLAGS]: <FlagsIcon className={'h-[100px] w-[100px]'}/>,
        [GameMode.ANIMALS]: <AnimalsIcon className={'h-[100px] w-[100px]'}/>,


    }

    return <div>
        <Swipes title={"Mode"}>
            {modes.map((mode) => (
                <div key={mode} className={'flex flex-col mx-2 rounded-xl p-4 items-center justify-center'}>
                    {iconMapping[mode]}
                    <div>
                        {mode}
                    </div>
                </div>
            ))}
        </Swipes>
    </div>
}