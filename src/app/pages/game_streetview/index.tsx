import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actions from "../../actions/game";
import {StreetViewGameMap} from "../../components/game/maps/streetView";
import {StreetViewVoteMap} from "../../components/game/maps/streetViewVoteMap";
import StreetViewGameOverlay from "../../components/game/overlays/streetView";
import {RoomJoinLoader} from "../../components/loading/roomJoinLoader";
import {subscribeConnectionEvents, subscribeGameStateEvents} from "../game_countries";
import {getCurrentPlayer} from "../../shared/selectors";
import {StreetViewOverlay} from "../../components/game/overlays/widgets";
import {StreetViewMovesOverlay} from "../../components/game/overlays/streetview/movesOverlay";

const CAMERA_POSITION = {lat: 32.5389916, lng: 28.7972057};

const StreetViewGamePage = ({game, joinGame, match}) => {
    const [lastMarkerPosition, setLastMarkerPosition] = useState(CAMERA_POSITION);
    const [center, setCenter] = useState(lastMarkerPosition);


    useEffect(() => subscribeGameStateEvents({game}));
    useEffect(() => subscribeConnectionEvents({game, match, joinGame, mode: "game_streetview"}), [game.players]);

    if (!game.players || !game.country) {
        return <RoomJoinLoader/>;
    }

    let player = getCurrentPlayer(game);


    const markerMoved = (ev) => {
        const vote = {lat: ev.latLng.lat(), lng: ev.latLng.lng()};

        setLastMarkerPosition(vote);
        (window as any).currentGame.send({type: "game:vote", payload: vote});
    };

    return (
        <div>
            <div id={"draggableContainer"} style={{position: "relative", top: "-80px"}}>
                {!game.roundEnd && <StreetViewGameMap
                    center={center}
                    markerMoved={markerMoved}
                    mapClicked={markerMoved}
                    showAllMarker={game.roundEnd}
                    player={player}
                    game={game}
                    lastMarkerPosition={lastMarkerPosition}
                />}
            </div>

            <StreetViewGameOverlay game={game} user={player} center={center} setCenter={setCenter}/>
            <StreetViewOverlay>
                <StreetViewVoteMap
                    center={center}
                    markerMoved={markerMoved}
                    mapClicked={markerMoved}
                    showAllMarker={game.roundEnd}
                    player={player}
                    game={game}
                    lastMarkerPosition={lastMarkerPosition}
                />
            </StreetViewOverlay>

            <StreetViewMovesOverlay game={game}/>
        </div>
    );
};

function mapStateToProps(state) {
    return {...state.lobby, user: state.user, game: state.game};
}

export default withRouter(connect(mapStateToProps, actions)(StreetViewGamePage));
