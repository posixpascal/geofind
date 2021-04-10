import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actions from "../../../actions/game";
import {GameLoadingOverlay} from "./streetview/gameLoadingOverlay";
import {GameOverOverlay} from "./streetview/gameOverOverlay";
import {RoundEndOverlay} from "./streetview/roundEndOverlay";
import {RoundOverlay} from "./streetview/roundOverlay";
import {StreetViewOverlay} from "./widgets";

export const StreetViewGameOverlay = ({game, leaveGame}) => {
    if (game.gameOver) {
        return <StreetViewOverlay><GameOverOverlay {...{leaveGame, game}} /></StreetViewOverlay>;
    }

    if (game.roundEnd) {
        return <StreetViewOverlay><RoundEndOverlay game={game}/></StreetViewOverlay>;
    }

    if (game.roundStart) {
        return <StreetViewOverlay><RoundOverlay {...{game}} /></StreetViewOverlay>;
    }

    return <StreetViewOverlay><GameLoadingOverlay/></StreetViewOverlay>;
};

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(mapStateToProps, actions)(StreetViewGameOverlay));
