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

export const Header = (props) => {
    const [showProfileEdit, setShowProfileEdit] = useState(false);

    return (
        <HeaderContainer>
            <BrandTitle> <NavLink to={"/"}>{strings.gameName}</NavLink></BrandTitle>
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
                    {/*<li>
                        <a href={"//github.com/posixpascal/geofinder"}>
                            {strings.sourceCode}
                        </a>
                    </li>*/}
                </ul>
            </Navigation>
        </HeaderContainer>
    )
};
