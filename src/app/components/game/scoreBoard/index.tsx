import React from "react";
import * as actions from "../../../actions/game";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {Overlay} from "../overlays";
import {PlayerScore, RequiredVictoryScore, UserList, UserName} from "./widgets";


const ScoreBoard = ({game}) => {
    const showScoreBoard = game && (game.roundStart || game.gameOver || window.innerWidth > 767);
    const scoreBoardStyle = {
        'top': 'initial',
        'left': 'initial',
        right: window.innerWidth > 767 ? 20 : 0,
        bottom: window.innerWidth > 767 ? 20 : 0
    };

    const scoreBoardTitle = game && game.currentRound > 0 && !game.roundEnd ? (
        <h3>Runde {game.currentRound} / {game.maxRounds}</h3>) : <h3>Score</h3>;

    if (!showScoreBoard) {
        return <></>
    }

    return <Overlay style={scoreBoardStyle}>
        <UserList>
            {scoreBoardTitle}
            <div className={"hay"}>
                {Object.keys(game.players).map(playerID => {
                    const player = game.players[playerID];
                    return <PlayerScore game={game} player={player} playerID={playerID} />
                })}
            </div>
            <RequiredVictoryScore game={game} />
        </UserList>
    </Overlay>
};

function mapStateToProps(state) {
    return {}
}

export default withRouter(connect(mapStateToProps, actions)(ScoreBoard));
