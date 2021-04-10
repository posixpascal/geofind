import React from "react";
import {connect} from "react-redux";
import {NavLink, withRouter} from "react-router-dom";
import * as actions from "../../actions/rooms";
import {strings} from "../../i18n";
import {HeaderNavigation} from "./navigation";
import {BrandTitle, HeaderContainer, Image} from "./widgets";

const Header = ({user, game}) => {
    return (
        <HeaderContainer>
            <BrandTitle>
                <NavLink to={"/"}>
                    {strings.gameName}
                </NavLink>
            </BrandTitle>
            <HeaderNavigation user={user}/>
        </HeaderContainer>
    );
};

function mapStateToProps(state) {
    return {user: state.user, room: state.room, game: state.game};
}

export default withRouter(connect(mapStateToProps, actions)(Header));
