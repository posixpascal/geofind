import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as actions from "../../actions/game";
import {GameMap} from "../../components/game/maps";
import {GameChatOverlay} from "../../components/game/overlays/chat";
import GameOverlay from "../../components/game/overlays/countries";
import ScoreBoard from "../../components/game/scoreBoard";
import {RoomJoinLoader} from "../../components/loading/roomJoinLoader";
import {getCurrentPlayer} from "../../shared/selectors";
import {helloDarknessSound, mapPinSound, playSoundIfPossible} from "../../sounds";

// user reconnect logic. if user still has no game after 3s we rejoin the game.
export const subscribeConnectionEvents = ({game, match, join, mode = "game_countries"}) => {
    const timer = setTimeout(() => {
        if (!game.players) {
            join({id: match.params.id, mode});
        }
    }, 3000);
    return () => {
        clearTimeout(timer);
    };
};

export const subscribeGameStateEvents = ({game}) => { // mobile optimizations
    document.body.classList.add("no-scroll");

    if (game && game.isSuddenDeath) {
        document.body.classList.add("sudden-death");
    } else {
        document.body.classList.remove("sudden-death");
    }

    return () => {
        document.body.classList.remove("no-scroll");
    };
};

export const subscribeInsultEvents = ({googleMap}) => {
    if (!window.currentGame) {
        return;
    }

    if (window.currentGame.listenerAttached) {
        return;
    }
    window.currentGame.listenerAttached = true;
    window.currentGame.onMessage((message) => {
        if (!googleMap.current) {
            return;
        }
        if (message.type === "map:animateTo") {
            googleMap.current.panTo(message.payload);
            return;
        }

        if (message.type === "insult:distance") {
            document.body.classList.add("helloDarkness");
            // noinspection JSIgnoredPromiseFromCall
            playSoundIfPossible(helloDarknessSound);
            googleMap.current.panTo(message.payload.vote.country);
            setTimeout(() => {
                document.body.classList.remove("helloDarkness");
            }, 10000);
            return;
        }
    });
};

const CAMERA_POSITION = {lat: 32.5389916, lng: 28.7972057};
const CountriesGamePage = ({game, join, match}) => {
    const [lastMarkerPosition, setLastMarkerPosition] = useState(CAMERA_POSITION);
    const [center, setCenter] = useState(lastMarkerPosition);

    const googleMap = useRef();

    useEffect(() => subscribeGameStateEvents({game}));
    useEffect(() => subscribeInsultEvents({googleMap}));
    useEffect(() => subscribeConnectionEvents({game, match, join}), [game.players]);

    if (!game.players) {
        return <RoomJoinLoader/>;
    }

    const player = getCurrentPlayer(game);

    const markerMoved = (ev) => {
        const vote = {lat: ev.latLng.lat(), lng: ev.latLng.lng()};

        // noinspection JSIgnoredPromiseFromCall
        playSoundIfPossible(mapPinSound);

        setLastMarkerPosition(vote);
        window.currentGame.send({type: "game:vote", payload: vote});
    };

    return (
        <div>
            <GameMap
                passRef={googleMap}
                center={center}
                markerMoved={markerMoved}
                mapClicked={markerMoved}
                showAllMarker={game.roundEnd}
                player={player}
                color={player.color}
                game={game}
                lastMarkerPosition={lastMarkerPosition}
            />
            <GameChatOverlay players={game.players} messages={game.messages}/>
            <GameOverlay game={game} user={player} center={center} setCenter={setCenter}/>
            <ScoreBoard game={game} scoreBoard={game.scoreBoard}/>
        </div>
    );
};

function mapStateToProps(state) {
    return {game: state.game};
}

export default withRouter(connect(mapStateToProps, actions)(CountriesGamePage));
