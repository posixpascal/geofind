import React, {useState} from "react";
import {strings} from "../../../../i18n";
import {Countdown} from "../../../countdown";
import {Flag} from "../../flag";

export const RoundEndOverlay = ({game}) => {
    const WinnerText = () => {
        return (
            <div>
                Round Winner<br/>
                {game.players[game.roundWinner].displayName}<br/>
                <Flag country={game.country}/>
                <hr/>
                Next Round starts in
                <br/>
                <Countdown from={7}/>
            </div>
        );
    };

    const LoserText = () => {
        return (
            <div>
                Darn it. No one found it.
                You were stranded in:
                <h2>
                    <Flag country={game.country}/>
                    {game.country.countryNameEn}</h2>
            </div>
        );
    };

    return (
        <div>
            <p>
                {strings.roundEnd}
            </p>
            {game.roundWinner && <WinnerText/>}
            {!game.roundWinner && <LoserText game={game}/>}
        </div>
    );
};
