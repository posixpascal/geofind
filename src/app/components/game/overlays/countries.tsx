import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actions from "../../../actions/game";
import {Overlay} from "./widgets";
import {RoundOverlay} from "./countries/roundOverlay";
import {GameLoadingOverlay} from "./countries/gameLoadingOverlay";
import {RoundEndOverlay} from "./countries/roundEndOverlay";
import {GameOverOverlay} from "./countries/gameOverOverlay";


export const CountriesGameOverlay = ({game, user, leaveGame}) => {
    if (game.gameOver) {
        return <Overlay><GameOverOverlay game={game} leaveGame={leaveGame}/></Overlay>
    }

    if (game.roundEnd) {
        return <Overlay><RoundEndOverlay game={game}/></Overlay>
    }

    if (game.roundStart) {
        return <Overlay><RoundOverlay user={user} game={game}/></Overlay>
    }

    return <GameLoadingOverlay/>
};

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(mapStateToProps, actions)(CountriesGameOverlay));
