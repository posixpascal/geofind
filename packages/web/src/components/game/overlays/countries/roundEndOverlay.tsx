import React from "react";
import {PushPin} from "../../../../helper/svgs";
import {language, strings} from "../../../../i18n";
import {SpinningVectorBox} from "../widgets";
import {Flag} from "../../flag";

export const RoundEndOverlay = ({game}) => {
    const playerIDs = Object.keys(game.players);

    const NoVote = ({player, scoreBoard}) => {
        return (
            <div key={player.player_id}>
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
        const showDistance = country.countryCode !== votes[player.player_id].country.countryCode;
        return (
            <div key={`cv_${player.id}`} style={{fontWeight: game.votes[player.player_id].hasWon ? "bold" : "normal"}}>
                <PushPin size={16} pinned={true} color={player.color}/>
                {player.displayName} <b className={"mobile-only"}>(Score: {scoreBoard[player.player_id].score})</b>
                <br/>
                <img
                    alt={""}
                    width={16}
                    src={`/assets/${votes[player.player_id].country.countryCode.toLowerCase()}.png`}
                />
                {language.indexOf("de") > -1 ? votes[player.player_id].country.countryNameDe : votes[player.player_id].country.countryNameEn}
                {showDistance && <UserDistance distance={votes[player.player_id].distanceInKm.toFixed(2)}/>}
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
