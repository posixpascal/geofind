import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actions from "../../../actions/game";
import {Overlay} from "../overlays";
import {PlayerScore, RequiredVictoryScore, UserList, UserName} from "./widgets";

const ScoreBoard = ({game}) => {
    const isMobile = window.innerWidth <= 767;
    const padding = isMobile ? 0 : 20;

    const showScoreBoard = (game.roundStart || game.gameOver || !isMobile);
    const scoreBoardStyle = {
        top: "initial",
        left: "initial",
        right: padding,
        bottom: padding,
    };

    if (!showScoreBoard) {
        return <>; </ > ;
    }

    let scoreBoardTitle = <h3>Score</h3>;
    if (game.currentRound > 0 && !game.roundEnd) {
        scoreBoardTitle = <h3>Runde {game.currentRound} / {game.maxRounds}</h3>;
    }

    return <Overlay style={scoreBoardStyle}>
        <UserList>
            {scoreBoardTitle}
            <div className={"hay"}>
                {Object.keys(game.players).map((playerID) => {
                    return <PlayerScore game={game} playerID={playerID}/>;
                })}
            </div>
            <RequiredVictoryScore game={game}/>
        </UserList>
    </Overlay>;
};

function mapStateToProps(state) {
    return {game: state.game};
}

export default withRouter(connect(mapStateToProps, actions)(ScoreBoard));
