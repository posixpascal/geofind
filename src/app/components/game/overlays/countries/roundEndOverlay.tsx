import React from "react";
import {PushPin} from "../../../../helper/svgs";
import {strings} from "../../../../i18n";
import {SpinningVectorBox} from "../widgets";

export const RoundEndOverlay = ({game}) => {
    const playerIDs = Object.keys(game.players);

    const NoVote = ({player, scoreBoard}) => {
        return (
            <div key={player.id}>
                <PushPin size={16} pinned={true} color={player.color}/>
                {player.displayName}
                <b className={"mobile-only"}>(Score: {scoreBoard[player.id].score})</b>
                <br/>
                &mdash;
                <br/>
                <hr className={"hidden-mobile"}/>
            </div>
        );
    };

    const UserDistance = ({distance}) => {
        return <span>({distance}km)</span>;
    };

    const CountryVote = ({country, player, scoreBoard, votes}) => {
        const showDistance = country.countryCode !== game.votes[player.id].country.countryCode;
        return (
            <div key={`cv_${player.id}`} style={{fontWeight: game.votes[player.id].hasWon ? "bold" : ""}}>
                <PushPin size={16} pinned={true} color={player.color}/>
                {player.displayName} <b className={"mobile-only"}>(Score: {scoreBoard[player.id].score})</b>
                <br/>
                <img
                    alt={"Country Flag of " + country.countryNameEn}
                    width={16}
                    src={`/assets/${votes[player.id].country.countryCode.toLowerCase()}.png`}
                />
                {votes[player.id].country.countryNameEn}
                {showDistance && <UserDistance distance={votes[player.id].distanceInKm.toFixed(2)}/>}
                <hr className={"hidden-mobile"}/>
            </div>
        );
    };

    const playerScores = playerIDs.map((playerID) => {
        const player = game.players[playerID];
        if (!game.votes[playerID]) {
            return <NoVote player={player} scoreBoard={game.scoreBoard}/>;
        }

        return (
            // tslint:disable-next-line:jsx-key
            <CountryVote
                country={game.country}
                votes={game.votes}
                player={player}
                scoreBoard={game.scoreBoard}
            />
        );
    });

    return (
        <SpinningVectorBox>
            <p>
                {strings.roundEnd}
            </p>
            {playerScores}
        </SpinningVectorBox>
    );
};
