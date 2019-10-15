// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import styled from "styled-components";
import {PushPin} from "../../../helper/svgs";
import {strings} from "../../../i18n";
import {HorizontalAlignment} from "../../uiWidgets/HorizontalAlignment";

export const UserList = styled.div`
@media (max-width: 767px){
  .hay {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > div {
        flex: 0 50%;
    }
  }

  h3 {
    margin: 0;
    font-size: 20px !important;
  }
}
`;

export const UserName = styled.div`
    font-size: 24px;
    margin-right: 20px;
`;

export const MiniScoreboard = ({game}) => {
    const scores = Object.keys(game.players).map((playerID) => {
        const player = game.players[playerID];
        const playerScore = game.scoreBoard[playerID];

        return (
            <div
                className={`${game.gameWinner === playerID ? "user-result-won" : "user-result-lost"}`}
                key={playerID}
                id={playerID}
            >
                {player.displayName}
                <PushPin
                    size={16}
                    pinned={true}
                    color={player.color}
                />
                ({playerScore.score} {strings.points})
            </div>
        );
    });
    return <div>{scores}</div>;
};

export const PlayerScore = ({game, playerID}) => {
    return (
        <HorizontalAlignment key={playerID}>
            <PushPin
                size={16}
                color={game.players[playerID].color}
                pinned={game.votes[playerID] && game.votes[playerID].hasVoted}
            />
            <UserName>
                {game.players[playerID].displayName} ({game.scoreBoard[playerID].score})
            </UserName>
        </HorizontalAlignment>
    );
};

export const RequiredVictoryScore = ({game}) => {
    return (
        <div className={"hidden-mobile"}>
            <hr/>
            {strings.victoryScoreInfoBefore} {game.victoryScore} {strings.victoryScoreInfoAfter}
        </div>
    );
};
