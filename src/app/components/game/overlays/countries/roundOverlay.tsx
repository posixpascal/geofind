import React, {useState} from "react";
import {strings} from "../../../../i18n";
import {SpinningVectorBox} from "../widgets";
import {PushPin} from "../../../../helper/svgs";

export const RoundOverlay = ({game, user}) => {
    const [showImage, setShowImage] = useState(true);

    return <SpinningVectorBox>
        <p className={"hidden-mobile"}>
            {strings.gamePlayInfoBefore} <PushPin size={16} pinned={true}
                                                  color={user.color}/> {strings.gamePlayInfoAfter}
        </p>
        <strong>{strings.searchFor}</strong>
        <h2>
            {showImage && <img width={48} onError={() => setShowImage(false)}
                               src={`/assets/${game.country.countryCode.toLowerCase()}.png`}/>}
            {game.country.countryNameEn}</h2>
        <hr/>
        <h1>{game.roundTimeLeft}</h1>
        <p>{strings.secondsTillRoundEnd}</p>
    </SpinningVectorBox>;
}
