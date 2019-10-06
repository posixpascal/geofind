import React, {useState, useEffect} from "react";
import * as actions from "../../actions/game";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {sharedHistory} from "../../helper/sharedHistory";
import {GameMap} from "../../components/game/maps";
import {client} from "../../helper/webSockets";
import {RoomJoinLoader} from "../../components/loading/roomJoinLoader";
import {StreetViewGameMap} from "../../components/game/maps/streetView";
import {Marker, OverlayView} from "react-google-maps";
import StreetViewGameOverlay from "../../components/game/overlays/streetView";
import {Overlay} from "../../components/game/overlays";
import {StreetViewVoteMap} from "../../components/game/maps/streetViewVoteMap";
import {PushPin, PushPinSVG} from "../../helper/svgs";


const CAMERA_POSITION = {lat: 32.5389916, lng: 28.7972057};


const StreetViewGamePage = ({game, joinGame, leaveGame, match}) => {
    const [lastMarkerPosition, setLastMarkerPosition] = useState(CAMERA_POSITION);
    const [center, setCenter] = useState(CAMERA_POSITION);

    useEffect(() => { // mobile optimizations
        document.body.classList.add("no-scroll");
        if (game && game.isSuddenDeath) {
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
                return joinGame({id: match.params.id, mode: "game_streetview"});
            }
        }, 3000);
        return () => {
            clearTimeout(timer);
        }
    }, [game.players]);

    if (!game.players) {
        return <RoomJoinLoader/>
    }


    let isLeader = false;
    let user;

    for (let playerId in game.players) {
        if (game.players[playerId].id === client.auth._id) {
            user = game.players[playerId];
        }
        if (game.leader === game.players[playerId].id) {
            isLeader = true;
        }
    }

    const markerMoved = (ev) => {
        const vote = {lat: ev.latLng.lat(), lng: ev.latLng.lng()};

        setLastMarkerPosition(vote);
        (window as any).currentGame.send({type: "game:vote", payload: vote})
    };

    return (
        <div>
            <div id={"draggableContainer"} style={{position: "relative", top: "-80px"}}>
                {!game.roundEnd && game.country.lat && <StreetViewGameMap
                    center={center}
                    markerMoved={markerMoved}
                    mapClicked={markerMoved}
                    showAllMarker={game.roundEnd}
                    player={user}
                    game={game}
                    lastMarkerPosition={lastMarkerPosition}
                />}
                {(!game.country || !game.country.lat) && <RoomJoinLoader/>}
            </div>
            <StreetViewGameOverlay game={game} user={user} center={center} setCenter={setCenter}/>
            <Overlay style={{
                right: "20px",
                bottom: "20px",
                left: "initial",
                width: "100%",
                height: "300px"
            }}>
                <StreetViewVoteMap
                    center={center}
                    markerMoved={markerMoved}
                    mapClicked={markerMoved}
                    showAllMarker={game.roundEnd}
                    player={user}
                    game={game}
                    lastMarkerPosition={lastMarkerPosition}
                />
            </Overlay>

            <Overlay style={{
                right: "20px",
                bottom: "20px",
                left: "initial",
                top: "initial",
                width: "100%",
            }}>
                {game && Object.keys(game.players).map((playerID) => {
                    const vote = game.votes[playerID] || {};
                    const player = game.players[playerID];
                    return <div>
                        {player.displayName}
                        <PushPin size={12} color={player.color} pinned={!!vote.pin_1}/>
                        <PushPin size={12} color={player.color} pinned={!!vote.pin_2}/>
                        <PushPin size={12} color={player.color} pinned={!!vote.pin_3}/>
                        <PushPin size={12} color={player.color} pinned={!!vote.pin_4}/>
                        <PushPin size={12} color={player.color} pinned={!!vote.pin_5}/>
                        (Score: {game.scoreBoard[playerID].score})
                    </div>;
                })}
            </Overlay>
        </div>
    );
}


function mapStateToProps(state) {
    return {...state.lobby, user: state.user, game: state.game}
}

export default withRouter(connect(mapStateToProps, actions)(StreetViewGamePage));
