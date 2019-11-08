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
                <span onClick={changeName}>{user.displayName}</span>
                <img alt="" src={user.avatarUrl} width={32}/>
            </CurrentUser>
            </li>
        </>
    );

    return (
        <Navigation>
            <ul>
                {user && <UserNavItem/>}
            </ul>
        </Navigation>
    );
};
