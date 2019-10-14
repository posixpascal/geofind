import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actions from "../../../actions/game";
import {GameLoadingOverlay} from "./countries/gameLoadingOverlay";
import {GameOverOverlay} from "./countries/gameOverOverlay";
import {RoundEndOverlay} from "./countries/roundEndOverlay";
import {RoundOverlay} from "./countries/roundOverlay";
import {Overlay} from "./widgets";

export const CountriesGameOverlay = ({game, user, leaveGame}) => {

    if (game.gameOver) {
        return <Overlay><GameOverOverlay {...{game, leaveGame}}/></Overlay>;
    }

    if (game.roundEnd) {
        return <Overlay><RoundEndOverlay game={game}/></Overlay>;
    }

    if (game.roundStart) {
        return <Overlay><RoundOverlay {...{user, game}} /></Overlay>;
    }

    return <Overlay><GameLoadingOverlay/></Overlay>;
};

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(mapStateToProps, actions)(CountriesGameOverlay));
