import React from "react";
import {strings} from "../../../../i18n";
import moment = require("moment");

export const RoundOverlay = ({game}) => {
    return <div>
        <h5>Wo bist du?</h5>
        <p>{strings.streetViewGameHint3}</p>
        <hr/>
        <h3>{moment().startOf("day")
            .seconds(game.timeElapsed)
            .format("HH:mm:ss")}</h3>
        {strings.elapsedTime}
    </div>;
}
