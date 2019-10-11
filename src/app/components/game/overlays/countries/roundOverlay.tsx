import React, {useState} from "react";
import {strings} from "../../../../i18n";
import {SpinningVectorBox} from "../widgets";
import {PushPin} from "../../../../helper/svgs";
import {Flag} from "../../flag";

export const RoundOverlay = ({game, user}) => {
    return <SpinningVectorBox>
        <p className={"hidden-mobile"}>
            {strings.gamePlayInfoBefore} <PushPin size={16} pinned={true}
                                                  color={user.color}/> {strings.gamePlayInfoAfter}
        </p>
        <strong>{strings.searchFor}</strong>
        <Flag country={game.country} />
        <hr/>
        <h1>{game.roundTimeLeft}</h1>
        <p>{strings.secondsTillRoundEnd}</p>
    </SpinningVectorBox>;
}
