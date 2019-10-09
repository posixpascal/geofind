import moment = require("moment");
import React, {useState} from "react";
import {Loader} from "react-feather";
import {connect} from "react-redux";
import {NavLink, withRouter} from "react-router-dom";
import styled from "styled-components";
import * as actions from "../../../actions/game";
import {compare} from "../../../helper/compare";
import {PushPin} from "../../../helper/svgs";
import {strings} from "../../../i18n";
import {Countdown} from "../../countdown";

const SearchBox = styled.div`
  .loader svg {
    animation: spin 0.8s linear infinite;
  }
`;

export const StreetViewOverlay = styled.div`
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

const StreetViewGameOverlay = ({game, user, center, setCenter, leaveGame}) => {
    const [showImage, setShowImage] = useState(true);

    let overlayContent = <> </>;

    if (!game.gameOver && game.roundStart && !game.roundEnd) {
        overlayContent = <SearchBox>
            <h5>Wo bist du?</h5>
            <p>{strings.streetViewGameHint3}</p>
            <hr/>
            <h3>{moment().startOf("day")
                .seconds(game.timeElapsed)
                .format("HH:mm:ss")}</h3>
            {strings.elapsedTime}
        </SearchBox>;
    } else if (!game.gameOver && !game.roundStart && !game.roundEnd) {
        overlayContent = <></>;
    } else if (!game.gameOver && !game.roundStart && game.roundEnd) {
        if (center.lat !== game.country.lat || center.lng !== game.country.lng) {
            setCenter({lat: game.country.lat, lng: game.country.lng});
        }
        overlayContent = <SearchBox>
            <p>
                {strings.roundEnd}
            </p>
            {game.roundWinner && <div>
                Round Winner<br/>
                {game.players[game.roundWinner].displayName}<br/>
                <h2>
                    {showImage && <img width={48} onError={() => setShowImage(false)}
                                       src={`/assets/${game.country.countryCode.toLowerCase()}.png`}/>}
                    <br/>
                    {game.country.countryNameEn}</h2>
                <hr/>
                Next Round starts in
                <br/>
                <Countdown from={7}/>
            </div>}

            {!game.roundWinner && <div>
                Darn it. No one found it.
                You were stranded in:
                <h2>
                    {showImage && <img width={48} onError={() => setShowImage(false)}
                                       src={`/assets/${game.country.countryCode.toLowerCase()}.png`}/>}
                    {game.country.countryNameEn}</h2>
            </div>}
        </SearchBox>;
    } else if (game.gameOver) {
        overlayContent = <SearchBox>
            <p>
                {strings.gameDone}
            </p>
            <strong>{strings.scoreTable}</strong>
            {Object.keys(game.players).map((playerID) => {
                const player = game.players[playerID];
                const playerScore = game.scoreBoard[playerID];

                return <div className={`${game.gameWinner === playerID ? "user-result-won" : "user-result-lost"}`}
                            key={playerID} id={playerID}>
                    {player.displayName} <PushPin size={16} pinned={true}
                                                  color={player.color}/> ({playerScore.score} {strings.points})
                </div>;
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
    return <StreetViewOverlay>{overlayContent}</StreetViewOverlay>;
};

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(mapStateToProps, actions)(StreetViewGameOverlay));
