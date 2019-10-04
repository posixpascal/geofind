import React from "react";
import styled from "styled-components";
import {Overlay} from "../home";
import {HorizontalAlignment} from "../../components/uiWidgets/HorizontalAlignment";
import {PushPin} from "../../helper/svgs";
import {strings} from "../../i18n";


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



export const ScoreBoard = (props) => {
    return <>
        {(props.game.state == "roundEnd" || props.game.state == "gameEnd" || window.innerWidth > 767) &&
        <Overlay style={{right: "0", bottom: 0, top: "initial", left: "initial"}}>
            <UserList>
                {props.game.round > 0 && props.game.state != "gameEnd" && <h3>Runde #{props.game.round}</h3>}
                <div className={"hay"}>{props.game.users.map(user => {
                    return <div key={user.id}>
                        <HorizontalAlignment>
                            <PushPin size={16} color={user.color}/>
                            <UserName>{user.name} ({user.gamePoints})</UserName>
                        </HorizontalAlignment>
                    </div>
                })}
                </div>
                <div className={"hidden-mobile"}>
                    <hr/>
                    {strings.victoryScoreInfoBefore} {props.lobby.victoryScore} {strings.victoryScoreInfoAfter}</div>
            </UserList>
        </Overlay>}
    </>
}
