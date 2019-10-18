import React from "react";
import {PushPin} from "../../../../helper/svgs";
import {language, strings} from "../../../../i18n";
import {Flag} from "../../flag";
import {SpinningVectorBox} from "../widgets";

export const RoundEndOverlay = ({game}) => {
    const playerIDs = Object.keys(game.players);

    const NoVote = ({player, scoreBoard}) => {
        return (
            <div key={player.playerId}>
                <PushPin size={16} pinned={true} color={player.color}/>
                {player.displayName}
                <b className={"mobile-only"}>(Score: {scoreBoard.score})</b>
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
        const showDistance = country.countryCode !== votes[player.playerId].country.countryCode;
        const countryNameDE = votes[player.playerId].country.countryNameDe;
        const countryNameEN = votes[player.playerId].country.countryNameEn;
        const playerVote = votes[player.playerId];

        return (
            <div key={`cv_${player.id}`} style={{fontWeight: playerVote.hasWon ? "bold" : "normal"}}>
                <PushPin size={16} pinned={true} color={player.color}/>
                {player.displayName} <b className={"mobile-only"}> (Score: {scoreBoard[player.playerId].score}) </b>
                <br/>
                <img
                    alt={""}
                    width={16}
                    src={`/assets/${playerVote.country.countryCode.toLowerCase()}.png`}
                />
                {language.indexOf("de") > -1 ? countryNameDE : countryNameEN}
                {showDistance && <UserDistance distance={playerVote.distanceInKm.toFixed(2)}/>}
                <hr className={"hidden-mobile"}/>
            </div>
        );
    };

    const playerScores = playerIDs.map((playerID) => {
        const player = game.players[playerID];
        if (!game.votes[playerID]) {
            return <NoVote player={player} scoreBoard={game.scoreBoard[playerID]}/>;
        }
        return (
            // tslint:disable-next-line:jsx-key
            <div key={`cvc_${playerID}`}>
                <CountryVote
                    country={game.country}
                    votes={game.votes}
                    player={player}
                    scoreBoard={game.scoreBoard}
                />
            </div>
        );
    });

    return (
        <SpinningVectorBox>
            <Flag country={game.country}/>
            <p>
                {strings.roundEnd}
            </p>
            {playerScores}
        </SpinningVectorBox>
    );
};
