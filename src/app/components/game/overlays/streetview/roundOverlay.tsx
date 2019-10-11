import moment = require("moment");
import React from "react";
import {strings} from "../../../../i18n";

export const RoundOverlay = ({game}) => {
    const timeElapsed = moment().startOf("day").seconds(game.timeElapsed).format("HH:mm:ss");

    return (
        <div>
            <h5>Wo bist du?</h5>
            <p>{strings.streetViewGameHint3}</p>
            <hr/>
            <h3>{timeElapsed}</h3>
            {strings.elapsedTime}
        </div>
    );
};
