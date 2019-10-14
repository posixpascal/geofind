import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actions from "../../actions/game";
import {StreetViewGameMap} from "../../components/game/maps/streetView";
import {StreetViewVoteMap} from "../../components/game/maps/streetViewVoteMap";
import StreetViewGameOverlay from "../../components/game/overlays/streetView";
import {StreetViewMovesOverlay} from "../../components/game/overlays/streetview/movesOverlay";
import {StreetViewOverlay} from "../../components/game/overlays/widgets";
import {RoomJoinLoader} from "../../components/loading/roomJoinLoader";
import {getCurrentPlayer} from "../../shared/selectors";
import {subscribeConnectionEvents, subscribeGameStateEvents} from "../game_countries";

const CAMERA_POSITION = {lat: 32.5389916, lng: 28.7972057};

const StreetViewGamePage = ({game, join, match}) => {
    const [lastMarkerPosition, setLastMarkerPosition] = useState(CAMERA_POSITION);
    const [center, setCenter] = useState(lastMarkerPosition);

    useEffect(() => subscribeGameStateEvents({game}));
    useEffect(() => subscribeConnectionEvents({game, match, join, mode: "game_streetview"}), [game.players]);

    if (!game.players || !game.country) {
        return <RoomJoinLoader/>;
    }

    const player = getCurrentPlayer(game);

    const markerMoved = (ev) => {
        const vote = {lat: ev.latLng.lat(), lng: ev.latLng.lng()};

        setLastMarkerPosition(vote);
        (window as any).currentGame.send({type: "game:vote", payload: vote});
    };

    const mapProps = {
        center,
        game,
        lastMarkerPosition,
        mapClicked: markerMoved,
        markerMoved,
        player,
        showAllMarker: game.roundEnd,
    };

    return (
        <div>
            <div id={"draggableContainer"} style={{position: "relative", top: "-80px"}}>
                {!game.roundEnd && <StreetViewGameMap {...mapProps} />}
            </div>

            <StreetViewGameOverlay game={game} user={player} center={center} setCenter={setCenter}/>
            <StreetViewOverlay>
                <StreetViewVoteMap {...mapProps} />
            </StreetViewOverlay>

            <StreetViewMovesOverlay game={game}/>
        </div>
    );
};

function mapStateToProps(state) {
    return {...state.lobby, user: state.user, game: state.game};
}

export default withRouter(connect(mapStateToProps, actions)(StreetViewGamePage));
