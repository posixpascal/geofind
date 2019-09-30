import React, {useState, useEffect} from "react";
import {compose, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import {Check, MapPin, XCircle, Zap} from "react-feather";
import styled from "styled-components";
import * as actions from "../../actions/lobby";
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import {strings} from "../../i18n";
import {HorizontalAlignment} from "../../components/uiWidgets/HorizontalAlignment";
import {webSocketConnection} from "../../helper/webSockets";
import { renderToString } from 'react-dom/server'
import {sharedHistory} from "../../helper/sharedHistory";
export const GameMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBrYhUk7lxR-FYLg5AQIpAIEyFlxsClq2k",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `calc(100vh - 70px)`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={3}
        defaultCenter={{lat: 32.5389916, lng: 28.7972057}}
        defaultOptions={{
            disableDefaultUI: true,
            styles: [
                {
                    featureType: "all",
                    elementType: "labels",
                    stylers: [
                        {visibility: "off"}
                    ]
                }
            ]
        }}
    >
        {props.isMarkerShown && !props.showAllMarker && <Marker onDragEnd={props.markerMoved} icon={{ url: PushPinSVG({ color: props.player.color, size: 60 })}} position={props.lastMarkerPosition} animation={(google as any).maps.Animation.DROP} draggable={true} />}
        {props.showAllMarker && props.game && props.game.results.map((result) => {
            return <Marker key={result.user.name} icon={{ url: PushPinSVG({ color: result.user.color })}} position={{lat: result.lat, lng: result.lng}} animation={(google as any).maps.Animation.DROP} draggable={false} />
        })}
        {props.showAllMarker && props.game && <Marker position={{lat: props.game.requirement.latlng[0], lng: props.game.requirement.latlng[1]}} animation={(google as any).maps.Animation.DROP} draggable={false} />
        }
    </GoogleMap>
);

const Overlay = styled.div`
  position: absolute;
  left: 30px;
  max-width: 240px;
  padding: 20px;
  z-index:20;
  top:100px;
  background:#fff;
  text-align: center;
  box-shadow: 3px 3px 8px rgba(0,0,0,.3);
  svg {
  }
  h2 {
    margin: 0;
    padding: 0;
    font-size: 32px;
  }
`;
const SearchBox = styled.div``;
const UserList = styled.div``;
const User = styled.div``;
const UserName = styled.div``;
const UserColor = styled.div``;

function ColorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }

    return rgb;
}

const PushPinSVG = ({color, size}) => {
    const encodedSVG = btoa(renderToString(<PushPin color={color} size={size} pinned={true}/>));
    return `data:image/svg+xml;charset=UTF-8;base64,{encodedSVG}`;
};

const PushPin = ({color, size = 30, pinned = false}) => {
    const colorLight = ColorLuminance(color, -0.2);
    const colorLight2 = ColorLuminance(color, 0.2);
    const colorLight3 = ColorLuminance(color, -0.1);
    const pinStyle = pinned ? {transform: "rotate(-45deg)", transition: "transform ease-in-out 0.5s"} : {transition: "transform ease-in-out 0.5s"};
    return <svg style={pinStyle} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 30 30`} width={size} height={size}>
        <path fill="#a3b7cc" d="M2 28.75L1 29 1.25 28 13.646 15.646 14.354 16.354z"/>
        <path fill={colorLight2}
              d="M12.484,12.527c3.735-1.797,5.965-4.023,7.674-7.662l4.961,4.961 c-3.917,1.705-6.152,3.93-7.682,7.654L12.484,12.527z"/>
        <path fill={colorLight}
              d="M20.298,5.713l3.958,3.958c-3.37,1.606-5.508,3.727-6.984,6.938l-3.945-3.945 C16.555,10.984,18.685,8.86,20.298,5.713 M20,4c-1.848,4.268-4.305,6.552-8.375,8.375l6,6C19.127,14.305,21.386,11.848,26,10L20,4 L20,4z"/>
        <path fill={colorLight3}
              d="M26.152,10.5c-0.376,0-0.729-0.146-0.996-0.413l-5.244-5.244C19.646,4.578,19.5,4.224,19.5,3.849 s0.146-0.729,0.413-0.995l1.095-1.139l7.278,7.278l-1.132,1.088C26.881,10.354,26.527,10.5,26.152,10.5z"/>
        <path fill={colorLight}
              d="M21.014,2.429l6.557,6.557l-0.779,0.749C26.621,9.906,26.394,10,26.152,10 c-0.242,0-0.47-0.094-0.642-0.266L20.266,4.49C20.094,4.319,20,4.091,20,3.849s0.094-0.47,0.28-0.656L21.014,2.429 M21,1 l-1.441,1.5c-0.745,0.745-0.745,1.952,0,2.697l5.244,5.244C25.175,10.814,25.664,11,26.152,11c0.488,0,0.976-0.186,1.348-0.559 L29,9L21,1L21,1z"/>
        <g>
            <path fill={colorLight3}
                  d="M6.707,13.339l0.795-0.795c0.673-0.673,1.568-1.043,2.52-1.043c0.951,0,1.846,0.371,2.519,1.043 l4.916,4.917c1.388,1.389,1.388,3.649,0,5.038l-0.796,0.795L6.707,13.339z"/>
            <path fill={colorLight}
                  d="M10.021,12c0.818,0,1.587,0.319,2.166,0.897l4.916,4.916c1.193,1.194,1.193,3.137,0,4.33 l-0.443,0.442l-9.247-9.247l0.442-0.442C8.434,12.319,9.204,12,10.021,12 M10.021,11c-1.04,0-2.079,0.397-2.873,1.19L6,13.339 L16.661,24l1.15-1.149c1.586-1.587,1.586-4.158,0-5.745l-4.916-4.916C12.101,11.397,11.061,11,10.021,11L10.021,11z"/>
        </g>
    </svg>
};

const DraggableContainer = styled.div`
  background: transparent;
`;
const Draggable = (props) => {
    const dragstart = () => {
        console.log(dragstart);
    };

    const dragmove = () => {

    };

    const dragend = () => {
        console.log(dragend);
    };

    return <DraggableContainer onMouseDown={dragstart} onMouseUp={dragend} onMouseMove={dragmove}>
        {props.children}
    </DraggableContainer>
};

const Countdown = ({from}) => {
    const [count, setCount] = useState(from);
    setTimeout(() => {
        if (count > 0) {
            setCount(count - 1);
        }
    }, 1000);
    return (
        <h1>{count}</h1>
    )
};

const GamePage = (props) => {
    const [showMarker, setShowMarker] = useState(true);
    const [lastMarkerPosition, setLastMarkerPosition] = useState({lat: 32.5389916, lng: 28.7972057});

    const delayedShowMarker = () => {
        setTimeout(() => {
            setShowMarker(true);
        }, 3000)
    };

    const handleMarkerClick = () => {
        setShowMarker(false);
        delayedShowMarker()
    };

    function compare( a, b ) {
        if ( a.gamePoints < b.gamePoints ){
            return -1;
        }
        if ( a.gamePoints > b.gamePoints ){
            return 1;
        }
        return 0;
    }

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

    let overlayContent = <></>;
    switch (props.game.state) {
        case "playing":
            overlayContent = <SearchBox>
                <p>
                    {strings.gamePlayInfoBefore} <PushPin size={16} pinned={true} color={props.user.color}/> {strings.gamePlayInfoAfter}
                </p>
                <strong>{strings.searchFor}</strong>
                <h2> <img src={`/assets/{props.game.requirement.country_code.toLowerCase()}.png`} /> {props.game.requirement.name}</h2>
                <hr/>
                <Countdown from={props.game.lobby.roundTime} />
                <p>{strings.secondsTillRoundEnd}</p>
            </SearchBox>;
            break;
        case "starting":
            overlayContent = <SearchBox>
                <p>
                    {strings.gameStartsIn}
                </p>
                <Countdown from={5}/>
            </SearchBox>;
            break;
        case "roundEnd":
            overlayContent = <SearchBox>
                <p>
                    {strings.roundEnd}
                </p>
                {props.game.results.map((result, index) => {
                    return <div key={index} style={{fontWeight: result.isWinner ? "bold" : ""}}>
                        <PushPin size={16} pinned={true} color={result.user.color}/><br/>
                        {result.user.name} ({result.distance.toFixed(2)}km)
                    </div>;
                })}
            </SearchBox>
            break;
        case "gameEnd":
            overlayContent = <SearchBox>
                <p>
                    {strings.gameDone}
                </p>
                <strong>{strings.scoreTable}</strong>
                {props.game.users.sort(compare).reverse().map((user, index) => {
                    return <div key={user.id} id={user.id}>
                        #{index + 1} {user.name} <PushPin size={16} pinned={true} color={user.color}/>
                    </div>
                })}
                <button onClick={backToLobby}>{strings.backToLobby}</button>
            </SearchBox>
            break;
        default:
            overlayContent = <SearchBox>
                <p>{strings.gameLoading}</p>
            </SearchBox>;

    }

    const markerMoved = (ev) => {
        setLastMarkerPosition({ lat: ev.latLng.lat(), lng: ev.latLng.lng() })
        webSocketConnection.emit("userVote", {
            lat: ev.latLng.lat(),
            lng: ev.latLng.lng()
        });
    };
    console.log(props.game);
    return (
        <div>
            <div id={"draggableContainer"}>
                <GameMap isMarkerShown={showMarker}
                         markerMoved={markerMoved}
                         showAllMarker={props.game.state == "roundEnd" || props.game.state == "gameEnd"}
                         player={props.user}
                         game={props.game}
                         lastMarkerPosition={lastMarkerPosition}
                         onMarkerClick={handleMarkerClick}/>
            </div>
            <Overlay>
                {overlayContent}
            </Overlay>

            <Overlay style={{right: "30px", left: "initial"}}>
                <UserList>
                    {props.game.round > 0 && props.game.state != "gameEnd" && <h3>Runde #{props.game.round}</h3>}
                    {props.game.users.map(user => {
                        const userIcon = user.isLeader ? <Zap/> : <User/>;
                        return <div key={user.id}>
                            <HorizontalAlignment>
                                <PushPin size={16} color={user.color}/>
                                <UserName>{user.name} ({user.gamePoints})</UserName>
                            </HorizontalAlignment>
                        </div>
                    })}
                    <hr/>
                    {strings.victoryScoreInfoBefore} {props.lobby.victoryScore} {strings.victoryScoreInfoAfter}
                </UserList>
            </Overlay>
        </div>
    );
};


function mapStateToProps(state) {
    return {...state.lobby, user: state.user, game: state.game}
}

export default withRouter(connect(mapStateToProps, actions)(GamePage));
