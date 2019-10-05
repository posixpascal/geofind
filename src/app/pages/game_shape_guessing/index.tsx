import React, {useState, useEffect} from "react";
import * as actions from "../../actions/rooms";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {sharedHistory} from "../../helper/sharedHistory";
import {GameMap} from "../../components/game/map";
import {GameOverlay} from "../../components/game/overlays";
import {ScoreBoard} from "../../components/game/scoreBoard";


const CAMERA_POSITION = {lat: 32.5389916, lng: 28.7972057};

const ShapeGuessingGamePage = (props) => {
    const [lastMarkerPosition, setLastMarkerPosition] = useState(CAMERA_POSITION);
    const [center, setCenter] = useState(CAMERA_POSITION);

    useEffect(() => {
       document.body.classList.add("no-scroll");
       return () => {
           document.body.classList.remove("no-scroll");
       }
    });

    let isLeader = false;

    for (let user of props.users){
        if (user.isLeader && user.id === props.user.id){
            isLeader = true;
        }
    }

    const backToLobby = () => {
      sharedHistory.push("/lobby_" + props.lobby.id);
    };

    const markerMoved = (ev) => {
        setLastMarkerPosition({ lat: ev.latLng.lat(), lng: ev.latLng.lng() })
        webSocketConnection.emit("userVote", {
            lat: ev.latLng.lat(),
            lng: ev.latLng.lng()
        });
    };

    return (
        <div>
            <div id={"draggableContainer"}>
                <GameMap
                         center={center}
                         markerMoved={markerMoved}
                         mapClicked={markerMoved}
                         showAllMarker={props.game.state == "roundEnd" || props.game.state == "gameEnd"}
                         player={props.user}
                         game={props.game}
                         lastMarkerPosition={lastMarkerPosition}
                         />
            </div>
            <GameOverlay game={props.game} user={props.user} backToLobby={backToLobby} center={center} setCenter={setCenter} />
            <ScoreBoard />
        </div>
    );
};


function mapStateToProps(state) {
    return {...state.lobby, user: state.user, game: state.game}
}

export default withRouter(connect(mapStateToProps, actions)(ShapeGuessingGamePage));
