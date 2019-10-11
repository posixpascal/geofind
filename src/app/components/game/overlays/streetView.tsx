import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actions from "../../../actions/game";
import {RoundOverlay} from "./streetview/roundOverlay";
import {RoundEndOverlay} from "./streetview/roundEndOverlay";
import {GameOverOverlay} from "./streetview/gameOverOverlay";
import {GameLoadingOverlay} from "./streetview/gameLoadingOverlay";
import {StreetViewOverlay} from "./widgets";


const StreetViewGameOverlay = ({game, user, center, setCenter, leaveGame}) => {
    if (game.gameOver){
        return <StreetViewOverlay><GameOverOverlay game={game} leaveGame={leaveGame} /></StreetViewOverlay>;
    }

    if (game.roundEnd){
        if (center.lat !== game.country.lat || center.lng !== game.country.lng) {
            setCenter({lat: game.country.lat, lng: game.country.lng});
        }
        return <StreetViewOverlay><RoundEndOverlay game={game} /></StreetViewOverlay>;
    }

    if (game.roundStart){
        return <StreetViewOverlay><RoundOverlay game={game} /></StreetViewOverlay>;
    }

    return <StreetViewOverlay><GameLoadingOverlay /></StreetViewOverlay>;
};

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(mapStateToProps, actions)(StreetViewGameOverlay));
