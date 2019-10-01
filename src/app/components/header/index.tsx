import React, {useState} from "react";
import styled from "styled-components";
import {strings} from "../../i18n";
import {changeName, updateUser, UserColor} from "../userListing";
import * as actions from "../../actions/lobby";
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import {Loader} from "react-feather";
export const HeaderContainer = styled.header`
  display: flex;
  background: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 5px solid #f1f1f1;
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
    animation: spin 0.3s infinite;
    position: absolute;
    left: 0;
    top: 2px;
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
                <NavLink to={"/"}><Image src={require("../../../assets/logo.svg")} /> {strings.gameName}</NavLink>
            </BrandTitle>
            <Navigation>
                <ul>
                    <li>
                        <NavLink to={"/"}>{strings.homeLink}</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/lobbies/new"}>{strings.createLobbyLink}</NavLink>
                    </li>
                    {/*<li>
                        <a onClick={() => setShowProfileEdit(!showProfileEdit)}>
                            {strings.editProfile}
                        </a>
                    </li>*/}
                    <li>
                        <a target={"_blank"} href={"//github.com/posixpascal/geofind_frontend"}>
                            {strings.sourceCode}
                        </a>
                    </li>
                    {props.user && <>
                    <Divider>

                    </Divider>
                        <li><CurrentUser>
                            <img src={props.user.image} width={32} />
                            <span onClick={changeName}>{props.user.name}</span>
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
    return {user: state.user, lobby: state.lobby, users: state.lobby.users}
}

export default withRouter(connect(mapStateToProps, actions)(Header));
