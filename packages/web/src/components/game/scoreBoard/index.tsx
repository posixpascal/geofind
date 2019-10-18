import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actions from "../../../actions/game";
import {Overlay} from "../overlays/widgets";
import {PlayerScore, RequiredVictoryScore, UserList} from "./widgets";

const ScoreBoard = ({game}) => {
    const isMobile = window.innerWidth <= 767;
    const padding = isMobile ? 0 : 20;

    const showScoreBoard = (game.roundStart || game.gameOver || !isMobile);
    const scoreBoardStyle = {
        bottom: padding,
        left: "initial",
        right: padding,
        top: "initial",
    };

    if (!showScoreBoard) {
        return <>; </ > ;
    }

    // do not show scoreboard during gameplay on mobile to save screen real estate

    let scoreBoardTitle = <h3>Score</h3>;
    if (game.currentRound > 0 && !game.roundEnd) {
        scoreBoardTitle = <h3>Runde {game.currentRound} / {game.maxRounds}</h3>;
    }

    const playerScores = Object.keys(game.players).map((playerID) => {
        return <span key={playerID}><PlayerScore game={game} playerID={playerID}/></span>;
    });

    return (
        <Overlay style={scoreBoardStyle}>
            <UserList>
                {scoreBoardTitle}
                <div className={"hay"}>
                    {playerScores}
                </div>
                <RequiredVictoryScore game={game}/>
            </UserList>
        </Overlay>
    );
};

function mapStateToProps(state) {
    return {game: state.game};
}

export default withRouter(connect(mapStateToProps, actions)(ScoreBoard));
