import React, {useState} from "react";
import styled from "styled-components";
import {strings} from "../../i18n";
import {changeName, updateUser, UserColor} from "../userListing";
import * as actions from "../../actions/rooms";
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import {Loader} from "react-feather";
import {Fire} from "../fire/fire";
export const HeaderContainer = styled.header`
  display: flex;
  background: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 5px solid #f1f1f1;
  position: sticky;
  top: 0;
  z-index: 110;
`;

export const BrandTitle = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 32px;
  display: flex;
  align-items: center;
  a {
  display: block;
  }
  img {
    height: 38px;
    position: relative;
    top: 5px;
  }
  @media (max-width: 767px){
    font-size: 20px;
    img {
      height: 22px;
    }
  }
`;

export const NavItem = styled.li`
  @media (max-width: 767px){
    display: none !important;
  }
`;


export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  ul {
    display: flex;
    justify-content: space-evenly;
    list-style: none;
    margin: 0;
    li {
      display: inline-block;
      padding: 20px;
      margin: 0;
      @media (max-width: 767px){
        padding: 10px;
      }
    }
  }
`;

const Divider = styled.li`
  border-right: 1px solid #ddd;
`;

const CurrentUser = styled.div`
  padding-left: 60px;
  position: relative;
  text-align: right;
  font-weight: 700;
  font-size: 18px;
  img {
    position: absolute;
    width: 40px;
    left: 0;
    top: -12px;
  }
  svg {
    animation: spin 0.8s linear infinite;
    position: absolute;
    left: 0;
    top: 2px;
  }
  
  @media (max-width: 767px){
    padding-left: 40px;
    img {
      width: 30px;
      top: -6px;
    }
  }
`;

const Image = styled.img`
  display: inline;
  height: 32px;
`;
 const Header = (props) => {
    const [showProfileEdit, setShowProfileEdit] = useState(false);


    return (
        <HeaderContainer>
            <BrandTitle>
                {props.game && props.game.isSuddenDeath && <Fire />}
                <NavLink to={"/"}>
                    {(!props.game || !props.game.isSuddenDeath) && <Image src={require("../../../assets/logo.svg")} />}
                    {(!props.game || !props.game.isSuddenDeath) && strings.gameName}
                    {(props.game && props.game.isSuddenDeath) && strings.suddenDeath}
                </NavLink>
            </BrandTitle>
            <Navigation>
                <ul>
                    <NavItem hiddenMobile={true}>
                        <NavLink to={"/"}>{strings.homeLink}</NavLink>
                    </NavItem>
                    <NavItem hiddenMobile={true}>
                        <NavLink to={"/lobbies/new"}>{strings.createLobbyLink}</NavLink>
                    </NavItem>
                    {/*<li>
                        <a onClick={() => setShowProfileEdit(!showProfileEdit)}>
                            {strings.editProfile}
                        </a>
                    </li>*/}
                    <NavItem hiddenMobile={true}>
                        <a target={"_blank"} href={"//github.com/posixpascal/geofind_frontend"}>
                            {strings.sourceCode}
                        </a>
                    </NavItem>
                    {props.user && <>
                    <Divider>

                    </Divider>
                        <li><CurrentUser>
                            <img src={props.user.avatarUrl} width={32} />
                            <span onClick={changeName}>{props.user.displayName}</span>
                        </CurrentUser>
                        </li>
                    </>}
                    {!props.user && <>
                        <Divider>
                        </Divider>
                        <li>
                            <CurrentUser>
                                <Loader /> Connecting...
                            </CurrentUser>
                        </li>
                    </>
                    }
                </ul>
            </Navigation>
        </HeaderContainer>
    )
};


function mapStateToProps(state) {
    return {user: state.user, room: state.room, game: state.game}
}

export default withRouter(connect(mapStateToProps, actions)(Header));
