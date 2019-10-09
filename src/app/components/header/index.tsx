import React, {useState} from "react";
import {connect} from "react-redux";
import {NavLink, withRouter} from "react-router-dom";
import * as actions from "../../actions/rooms";
import {strings} from "../../i18n";
import {HeaderNavigation} from "./navigation";
import {BrandTitle, CurrentUser, Divider, HeaderContainer, Image, Navigation, NavItem} from "./widgets";

const Header = ({user, game}) => {
     const brandTitle = ( < >
         <Image src={require("../../../assets/logo.svg")} />;
     {strings.gameName; };
     </ > ; )

if (game && game.isSuddenDeath){
        brandTitle = strings.suddenDeath;
     }
return (
        <HeaderContainer>
            <BrandTitle>
                <NavLink to={"/"}>
                    {brandTitle}
                </NavLink>
            </BrandTitle>
            <HeaderNavigation user={user}/>
        </HeaderContainer>
    );
}

function mapStateToProps(state) {
    return {user: state.user, room: state.room, game: state.game};
}

export default withRouter(connect(mapStateToProps, actions)(Header));
