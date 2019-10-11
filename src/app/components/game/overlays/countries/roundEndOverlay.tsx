import React from "react";
import {strings} from "../../../../i18n";
import {SpinningVectorBox} from "../widgets";
import {PushPin} from "../../../../helper/svgs";

export const RoundEndOverlay = ({game}) => {
    return <SpinningVectorBox>
        <p>
            {strings.roundEnd}
        </p>
        {Object.keys(game.players).map((playerID, index) => {
            const player = game.players[playerID];
            if (!game.votes[playerID]){
                return <div key={index}>
                    <PushPin size={16} pinned={true} color={player.color}/> {player.displayName} <b className={"mobile-only"}>(Score: {game.scoreBoard[playerID].score})</b>
                    <br/>
                    &mdash;
                    <br/>
                    <hr className={"hidden-mobile"}/>
                </div>;
            }

            return <div key={index} style={{fontWeight: game.votes[playerID].hasWon ? "bold" : ""}}>
                <PushPin size={16} pinned={true} color={player.color}/>
                {player.displayName} <b className={"mobile-only"}>(Score: {game.scoreBoard[playerID].score})</b>
                <br/>
                <img width={16} src={`/assets/${game.votes[playerID].country.countryCode.toLowerCase()}.png`} /> {game.votes[playerID].country.countryNameEn}
                {game.country.countryCode !== game.votes[playerID].country.countryCode && <span>({game.votes[playerID].distanceInKm.toFixed(2)}km)</span>}
                <hr className={"hidden-mobile"}/>
            </div>;
        })}
    </SpinningVectorBox>;
};
