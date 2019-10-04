import React, {useState, useEffect} from "react";
import * as actions from "../../actions/lobby";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {webSocketConnection} from "../../helper/webSockets";
import {sharedHistory} from "../../helper/sharedHistory";
import {GameMap} from "../../components/gameMap";
import {GameOverlay} from "./overlays";
import {ScoreBoard} from "./scoreBoard";


const CAMERA_POSITION = {lat: 32.5389916, lng: 28.7972057};

const GamePage = (props) => {
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
      webSocketConnection.emit("backToLobby");
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

export default withRouter(connect(mapStateToProps, actions)(GamePage));
