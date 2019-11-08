import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import * as allGameActions from "../../actions/game";
import * as allRoomActions from "../../actions/rooms";
import {List, ListItem} from "../../components/list";


const ProfilePage = ({match, room, roomActions, gameActions}) => {
    return <div>
        <List>
            <ListItem>Name</ListItem>
            <ListItem>Pin / Farbe</ListItem>
            <ListItem>Erfolge</ListItem>
            <ListItem>Konto anlegen</ListItem>
            <ListItem>Einstellungen</ListItem>
        </List>
    </div>
};

function mapStateToProps(state) {
    return {room: state.room, game: state.game};
}

function mapDispatchToProps(dispatch) {
    return {
        gameActions: bindActionCreators(allGameActions, dispatch),
        roomActions: bindActionCreators(allRoomActions, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));
