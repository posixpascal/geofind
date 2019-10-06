import React, {useState, useEffect} from "react";
import * as actions from "../../actions/game";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {sharedHistory} from "../../helper/sharedHistory";
import {GameMap} from "../../components/game/maps";
import GameOverlay from "../../components/game/overlays";
import ScoreBoard from "../../components/game/scoreBoard";
import {client} from "../../helper/webSockets";
import {RoomJoinLoader} from "../../components/loading/roomJoinLoader";


const CAMERA_POSITION = {lat: 32.5389916, lng: 28.7972057};

const CountriesGamePage = ({game, joinGame, leaveGame, match}) => {
    const [lastMarkerPosition, setLastMarkerPosition] = useState(CAMERA_POSITION);
    const [center, setCenter] = useState(CAMERA_POSITION);

    useEffect(() => { // mobile optimizations
       document.body.classList.add("no-scroll");
       if (game && game.isSuddenDeath){
           document.body.classList.add("sudden-death");
       } else {
           document.body.classList.remove("sudden-death");
       }
       return () => {
           document.body.classList.remove("no-scroll");
       }
    });


    useEffect(() => { // user reconnect logic. if user still has no game after 3s we rejoin the game.
        let timer = setTimeout(() => {
            if (!game.players) {
                joinGame({id: match.params.id, mode: "game_countries"});
            }
        }, 3000);
        return () => {
            clearTimeout(timer);
        }
    });

    if (!game.players){
        return <RoomJoinLoader/>
    }


    let isLeader = false;
    let user;

    for (let playerId in game.players){
        if (game.players[playerId].id === client.auth._id){
            user = game.players[playerId];
        }
        if (game.leader === game.players[playerId].id){
            isLeader = true;
        }
    }

    const markerMoved = (ev) => {
        const vote = { lat: ev.latLng.lat(), lng: ev.latLng.lng() };

        setLastMarkerPosition(vote);
        (window as any).currentGame.send({ type: "game:vote", payload: vote})
    };

    return (
        <div>
            <div id={"draggableContainer"}>
                <GameMap
                         center={center}
                         markerMoved={markerMoved}
                         mapClicked={markerMoved}
                         showAllMarker={game.roundEnd}
                         player={user}
                         game={game}
                         lastMarkerPosition={lastMarkerPosition}
                         />
            </div>
            <GameOverlay game={game} user={user} center={center} setCenter={setCenter} />
            <ScoreBoard game={game} scoreBoard={game.scoreBoard} />
        </div>
    );
};


function mapStateToProps(state) {
    return {game: state.game}
}

export default withRouter(connect(mapStateToProps, actions)(CountriesGamePage));
