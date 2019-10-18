import React from "react";
import {connect} from "react-redux";
import {NavLink, withRouter} from "react-router-dom";
import * as actions from "../../actions/rooms";
import {strings} from "../../i18n";
import {HeaderNavigation} from "./navigation";
import {BrandTitle, HeaderContainer, Image} from "./widgets";

// @ts-ignore - Parcel loads this
const LOGO_SVG = "/assets/logo.svg";

const Header = ({user, game}) => {
    const BrandName = () => {
        if (game && game.isSuddenDeath) {
            return <span>{strings.suddenDeath}</span>;
        }

        return (
            <span>
                <img style={{display: "inline", height: "32px"}} src={LOGO_SVG}/>
                {strings.gameName}
            </span>
        );
    };

    return (
        <HeaderContainer>
            <BrandTitle>
                <NavLink to={"/"}>
                    <span>
                        <img style={{display: "inline", height: "32px"}} src={LOGO_SVG}/>
                        {strings.gameName}
                    </span>
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
