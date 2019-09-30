import React, {useState} from "react";
import {NavLink} from "react-router-dom";

import styled from "styled-components";
import {strings} from "../../i18n";
import {UserColor} from "../userListing";

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

const Image = styled.img`
  display: inline;
  height: 32px;
`;
export const Header = (props) => {
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
                </ul>
            </Navigation>
        </HeaderContainer>
    )
};
