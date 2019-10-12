import React from "react";
import {NavLink} from "react-router-dom";
import {strings} from "../../i18n";
import {changeName} from "../userListing";
import {CurrentUser, Divider, Navigation, NavItem} from "./widgets";

export const HeaderNavigation = ({user}) => {
    const UserNavItem = () => (
        <>
            <Divider/>
            <li><CurrentUser>
                <img alt="Your user's avatar" src={user.avatarUrl} width={32}/>
                <span onClick={changeName}>{user.displayName}</span>
            </CurrentUser>
            </li>
        </>
    );

    return (
        <Navigation>
            <ul>
                <NavItem hiddenMobile={true}>
                    <NavLink to={"/"}>{strings.homeLink}</NavLink>
                </NavItem>
                <NavItem hiddenMobile={true}>
                    <a target={"_blank"} href={"//github.com/posixpascal/geofind_frontend"}>
                        {strings.sourceCode}
                    </a>
                </NavItem>
                {user && <UserNavItem/>}
            </ul>
        </Navigation>
    );
};
