import React from "react";
import {strings} from "../../../../i18n";
import {Countdown} from "../../../countdown";
import {SpinningVectorBox} from "../widgets";

export const GameLoadingOverlay = () => {
    return (
        <SpinningVectorBox>
            <p>
                {strings.gameStartsIn}
            </p>
            <Countdown from={5}/>
        </SpinningVectorBox>
    );
};
