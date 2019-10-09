import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import UIfx from "uifx";
import helloDarknessAudio from "../../../sounds/helloDarkness.mp3";
import mapPinAudio from "../../../sounds/mapPin.mp3";
import * as actions from "../../actions/game";
import ChatWindow from "../../components/chat";
import {GameMap} from "../../components/game/maps";
import GameOverlay, {Overlay} from "../../components/game/overlays";
import ScoreBoard from "../../components/game/scoreBoard";
import {RoomJoinLoader} from "../../components/loading/roomJoinLoader";
import {sharedHistory} from "../../helper/sharedHistory";
import {client} from "../../helper/webSockets";

const helloDarkness = new UIfx(
    helloDarknessAudio,
    {
        volume: 0.5,
    },
);

const mapPin = new UIfx(
    mapPinAudio,
    {
        volume: 0.05,
    },
);

const CAMERA_POSITION = {lat: 32.5389916, lng: 28.7972057};
const CountriesGamePage = ({game, joinGame, leaveGame, match}) => {
    const [lastMarkerPosition, setLastMarkerPosition] = useState(CAMERA_POSITION);
    const [center, setCenter] = useState(CAMERA_POSITION);
    const googleMap = useRef();
    useEffect(() => { // mobile optimizations
        document.body.classList.add("no-scroll");
        if (game && game.isSuddenDeath) {
            document.body.classList.add("sudden-death");
        } else {
            document.body.classList.remove("sudden-death");
        }
        return () => {
            document.body.classList.remove("no-scroll");
        };
    });

    useEffect(() => {
        if (!(window as any).currentGame) {
            return;
        }

        // just used for memes at the moment.
        if ((window as any).currentGame.listenerAttached){ return; }
        (window as any).currentGame.listenerAttached = true;
        (window as any).currentGame.onMessage((message) => {
            console.log(googleMap);
            switch (message.type) {
                case "map:animateTo":
                    if (googleMap.current){
                        googleMap.current.panTo(message.payload);
                    }
                    break;
                case "map:roundInit":
                    if (googleMap.current && lastMarkerPosition){

                        //googleMap.current.panTo(lastMarkerPosition);
                    }
                    break;
                case "insult:distance":
                    if (googleMap.current && !localStorage.getItem("audioMuted")){
                        document.body.classList.add("helloDarkness");
                        helloDarkness.play();
                        googleMap.current.panTo(message.payload.vote.country);
                        setTimeout(() => {
                           document.body.classList.remove("helloDarkness");
                        }, 10000);
                    }
                    break;
                case "insult:info":
                    break;
                case "insult:closeTogether":
                    break;
                case "insult:closeTogether":
                    break;
            }
        });
    });

    useEffect(() => { // user reconnect logic. if user still has no game after 3s we rejoin the game.
        const timer = setTimeout(() => {
            if (!game.players) {
                joinGame({id: match.params.id, mode: "game_countries"});
            }
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    });

    if (!game.players) {
        return <RoomJoinLoader/>;
    }

    let isLeader = false;
    let user;

    for (const playerId in game.players) {
        if (game.players[playerId].id === client.auth._id) {
            user = game.players[playerId];
        }
        if (game.leader === game.players[playerId].id) {
            isLeader = true;
        }
    }

    const markerMoved = (ev) => {
        const vote = {lat: ev.latLng.lat(), lng: ev.latLng.lng()};
        if ( !localStorage.getItem("audioMuted")){mapPin.play(); }
        setLastMarkerPosition(vote);
        (window as any).currentGame.send({type: "game:vote", payload: vote});
    };

    return (
        <div>
            <div id={"draggableContainer"}>
                <GameMap
                    passRef={googleMap}
                    center={center}
                    markerMoved={markerMoved}
                    mapClicked={markerMoved}
                    showAllMarker={game.roundEnd}
                    player={user}
                    game={game}
                    lastMarkerPosition={lastMarkerPosition}
                />
            </div>
            {window.innerWidth > 767 && <Overlay style={{left: "initial", right: "20px", top: "80px"}}>
                <ChatWindow inGame={true} players={game.players} messages={game.messages}></ChatWindow>
            </Overlay>}
            <GameOverlay game={game} user={user} center={center} setCenter={setCenter}/>
            <ScoreBoard game={game} scoreBoard={game.scoreBoard}/>
        </div>
    );
};

function mapStateToProps(state) {
    return {game: state.game};
}

export default withRouter(connect(mapStateToProps, actions)(CountriesGamePage));
