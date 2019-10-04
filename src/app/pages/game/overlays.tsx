import React from "react";
import {strings} from "../../i18n";
import {PushPin} from "../../helper/svgs";
import {Countdown} from "../../components/countdown";
import {compare} from "../../helper/compare";
import {Loader} from "react-feather";
import styled from "styled-components";

const SearchBox = styled.div`
  .loader svg {
    animation: spin 0.8s linear infinite;
  }
`;

const Overlay = styled.div`
  position: absolute;
  left: 30px;
  max-width: 240px;
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


export const GameOverlay = ({ game, user, center, setCenter, backToLobby }) => {
    let overlayContent = <></>;
    switch (game.state) {
        case "playing":
            overlayContent = <SearchBox>
                <p className={"hidden-mobile"}>
                    {strings.gamePlayInfoBefore} <PushPin size={16} pinned={true} color={user.color}/> {strings.gamePlayInfoAfter}
                </p>
                <strong>{strings.searchFor}</strong>
                <h2> <img src={`/assets/{props.game.requirement.country_code.toLowerCase()}.png`} /> {game.requirement.name}</h2>
                <hr/>
                <Countdown from={game.lobby.roundTime} />
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
            if (center.lat !== game.requirement.latlng[0] || center.lng !== game.requirement.latlng[1]) {
                setCenter({lat: game.requirement.latlng[0], lng: game.requirement.latlng[1]})
            }
            overlayContent = <SearchBox>
                <p>
                    {strings.roundEnd}
                </p>
                {game.results.map((result, index) => {
                    return <div key={index} style={{fontWeight: result.isWinner ? "bold" : ""}}>
                        <PushPin size={16} pinned={true} color={result.user.color}/><br/>
                        {result.user.name} <b className={"mobile-only"}>(Score: {result.user.gamePoints})</b> ({result.distance.toFixed(2)}km)
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
                {game.users.sort(compare).reverse().map((user, index) => {
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
                <div className={"loader"}>
                    <Loader />
                </div>
            </SearchBox>;
    }
    return <Overlay>{overlayContent}</Overlay>;
};
