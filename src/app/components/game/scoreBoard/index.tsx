import React from "react";
import styled from "styled-components";

import {strings} from "../../../i18n";
import {PushPin} from "../../../helper/svgs";
import {HorizontalAlignment} from "../../uiWidgets/HorizontalAlignment";
import * as actions from "../../../actions/game";
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import {Overlay} from "../overlays";


const UserList = styled.div`
@media (max-width: 767px){
  .hay {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > div {
        flex: 0 50%;
    }
  }
  
  h3 {
    margin: 0;
    font-size: 20px !important;
  }
}
`;
const UserName = styled.div``;


const ScoreBoard = ({game, scoreBoard}) => {
    if (!game) {
        return <></>
    }

    return <>
        {(game.roundStart || game.gameOver || window.innerWidth > 767) &&
        <Overlay style={{right: window.innerWidth > 767 ? 20 : 0, bottom: window.innerWidth > 767 ? 20 : 0, top: "initial", left: "initial"}}>
                <UserList>
                    {game.currentRound > 0 && !game.roundEnd && <h3>Runde {game.currentRound} / {game.maxRounds}</h3>}
                    {(game.currentRound <= 0 || game.roundEnd) && <h3>Score</h3>}
                    <div className={"hay"}>
                        {Object.keys(game.players).map(playerID => {
                            const player = game.players[playerID];
                            return <div key={playerID}>
                                <HorizontalAlignment>
                                    <PushPin size={16} color={player.color}
                                             pinned={game.votes[playerID] && game.votes[playerID].hasVoted}/>
                                    <UserName>{player.displayName} ({game.scoreBoard[playerID].score})</UserName>
                                </HorizontalAlignment>
                            </div>
                        })}
                    </div>
                    <div className={"hidden-mobile"}>
                        <hr/>
                        {strings.victoryScoreInfoBefore} {game.victoryScore} {strings.victoryScoreInfoAfter}</div>
                </UserList>
        </Overlay>}
    </>
}

function mapStateToProps(state) {
    return {}
}

export default withRouter(connect(mapStateToProps, actions)(ScoreBoard));
