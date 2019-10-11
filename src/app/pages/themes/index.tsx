import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as gameActions from "../../actions/game";
import * as actions from "../../actions/rooms";

const ThemesPage = () => {
    return (
        <div>
            <h1>Choose A Map Theme</h1>
        </div>
    );
};

function mapStateToProps(state) {
    return {lobbies: state.lobbies};
}

export default withRouter(connect(mapStateToProps, {...actions, ...gameActions})(ThemesPage));
