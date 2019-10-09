import React from "react";
import {CurrentUser, Divider, Navigation, NavItem} from "./widgets";
import {strings} from "../../i18n";
import {changeName} from "../userListing";
import {NavLink} from "react-router-dom";

export const HeaderNavigation = ({user}) => {
    return <Navigation>
        <ul>
            <NavItem hiddenMobile={true}>
                <NavLink to={"/"}>{strings.homeLink}</NavLink>
            </NavItem>
            <NavItem hiddenMobile={true}>
                <a target={"_blank"} href={"//github.com/posixpascal/geofind_frontend"}>
                    {strings.sourceCode}
                </a>
            </NavItem>
            {user && <>
                <Divider>

                </Divider>
                <li><CurrentUser>
                    <img src={user.avatarUrl} width={32} />
                    <span onClick={changeName}>{user.displayName}</span>
                </CurrentUser>
                </li>
            </>}
        </ul>
    </Navigation>
};
