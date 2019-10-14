import React from "react";
import {PushPin} from "../../../../helper/svgs";
import {strings} from "../../../../i18n";
import {Flag} from "../../flag";
import {SpinningVectorBox} from "../widgets";

export const RoundOverlay = ({game, user}) => {
    return (
        <SpinningVectorBox>
            <p className={"hidden-mobile"}>
                {strings.gamePlayInfoBefore}
                <PushPin
                    size={16}
                    pinned={true}
                    color={user.color}
                />
                {strings.gamePlayInfoAfter}
            </p>
            <strong>{strings.searchFor}</strong>
            <Flag country={game.country}/>
            <hr/>
            <h1>{game.roundTimeLeft}</h1>
            <p>{strings.secondsTillRoundEnd}</p>
        </SpinningVectorBox>
    );
};
