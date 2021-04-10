import React from "react";
import * as actions from "../../actions/surfaces";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const MemeSurface = ({actions}) => {
    return <div>Surface</div>;
};

function mapStateToProps(state) {
    return {lobbies: state.lobbies};
}

export default withRouter(connect(mapStateToProps, {actions})(MemeSurface));
