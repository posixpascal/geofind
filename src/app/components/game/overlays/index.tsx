import React, {useState} from "react";
import {Loader} from "react-feather";
import styled from "styled-components";
import {compare} from "../../../helper/compare";
import {strings} from "../../../i18n";
import {PushPin} from "../../../helper/svgs";
import {Countdown} from "../../countdown";
import * as actions from "../../../actions/game";
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";

const SearchBox = styled.div`
  .loader svg {
    animation: spin 0.8s linear infinite;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  left: 30px;
  max-width: 320px;
  padding: 20px;
  z-index:20;
  top:90px;
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
  .mobile-only {
    display: none;
  }
  @media (max-width: 767px){
    top: 70px; !important;
    left: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    box-shadow: none !important;
    .hidden-mobile {
      display: none !important;
    }
    .mobile-only {
      display: inline-block;
    }
    hr {
      margin: 10px 0;
    }
    
    h1 {
    font-size: 20px;
    margin: 0;
    }
    p { margin: 0;}
  }
`;


const GameOverlay = ({game, user, center, setCenter, leaveGame}) => {
        const [showImage, setShowImage] = useState(true);

        let overlayContent = <></>;

        if (!game.gameOver && game.roundStart && !game.roundEnd) {
            overlayContent = <SearchBox>
                <p className={"hidden-mobile"}>
                    {strings.gamePlayInfoBefore} <PushPin size={16} pinned={true}
                                                          color={user.color}/> {strings.gamePlayInfoAfter}
                </p>
                <strong>{strings.searchFor}</strong>
                <h2>
                    {showImage && <img width={36} onError={() => setShowImage(false)}
                                       src={`/assets/${game.country.countryCode.toLowerCase()}.png`}/>}
                                       {game.country.countryNameEn}</h2>
                <hr/>
                <h1>{game.roundTimeLeft}</h1>
                <p>{strings.secondsTillRoundEnd}</p>
            </SearchBox>;
        } else if (!game.gameOver && !game.roundStart && !game.roundEnd) {
            overlayContent = <SearchBox>
                <p>
                    {strings.gameStartsIn}
                </p>
                <Countdown from={5}/>
            </SearchBox>;
        } else if (!game.gameOver && !game.roundStart && game.roundEnd) {
            if (center.lat !== game.country.lat || center.lng !== game.country.lng) {
                setCenter({lat: game.country.lat, lng: game.country.lng})
            }
            overlayContent = <SearchBox>
                <p>
                    {strings.roundEnd}
                </p>
                {Object.keys(game.players).map((playerID, index) => {
                    const player = game.players[playerID];
                    if (!game.votes[playerID]){
                        return <div key={index}>
                            {player.displayName} <b className={"mobile-only"}>(Score: {game.scoreBoard[playerID].score})</b>
                            <br/>
                            <PushPin size={16} pinned={true} color={player.color}/>
                            <br/>
                            &mdash;
                            <br/>
                            <hr className={"hidden-mobile"}/>
                        </div>
                    }

                    return <div key={index} style={{fontWeight: game.votes[playerID].hasWon ? "bold" : ""}}>
                        {player.displayName} <b className={"mobile-only"}>(Score: {game.scoreBoard[playerID].score})</b>
                        <br/>
                        <PushPin size={16} pinned={true} color={player.color}/>
                        <br/>
                        <img width={16} src={`/assets/${game.votes[playerID].country.countryCode.toLowerCase()}.png`} /> {game.votes[playerID].country.countryNameEn}
                        {game.country.countryCode !== game.votes[playerID].country.countryCode && <span>({game.votes[playerID].distanceInKm.toFixed(2)}km)</span>}
                        <hr className={"hidden-mobile"}/>
                    </div>;
                })}
            </SearchBox>
        } else if (game.gameOver) {
            overlayContent = <SearchBox>
                <p>
                    {strings.gameDone}
                </p>
                <strong>{strings.scoreTable}</strong>
                {Object.keys(game.players).map((playerID) => {
                    const player = game.players[playerID];
                    const playerScore = game.scoreBoard[playerID];

                    return <div className={`${game.gameWinner === playerID ? 'user-result-won' : 'user-result-lost'}`} key={playerID} id={playerID}>
                        {player.displayName} <PushPin size={16} pinned={true} color={player.color}/> ({playerScore.score} {strings.points})
                    </div>
                })}
                <button onClick={leaveGame}>{strings.backToHome}</button>
            </SearchBox>;
        } else {
            overlayContent = <SearchBox>
                <p>{strings.gameLoading}</p>
                <div className={"loader"}>
                    <Loader/>
                </div>
            </SearchBox>;
        }
        return <Overlay>{overlayContent}</Overlay>;
    }
;

function mapStateToProps(state) {
    return {}
}

export default withRouter(connect(mapStateToProps, actions)(GameOverlay));
