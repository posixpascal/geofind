import React, {useState} from "react";
import {strings} from "../../i18n";
import * as actions from "../../actions/rooms";
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import {BrandTitle, CurrentUser, Divider, HeaderContainer, Navigation, NavItem, Image} from "./widgets";
import {HeaderNavigation} from "./navigation";

 const Header = ({user, game}) => {
     let brandTitle = (<>
         <Image src={require("../../../assets/logo.svg")} />
         {strings.gameName}
     </>);

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
    )
};


function mapStateToProps(state) {
    return {user: state.user, room: state.room, game: state.game}
}

export default withRouter(connect(mapStateToProps, actions)(Header));
