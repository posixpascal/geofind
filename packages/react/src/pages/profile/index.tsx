import React, {useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import * as allUserActions from "../../actions/user";
import {List, ListItem, ListItemSuffix} from "../../components/list";
import {UserPin} from "../../components/pins/userPin";
import {ColorDot} from "../../components/userListing/colorDot";
import {ChangeNameDialog} from "../../components/dialogs/changeNameDialog";
import {ChevronRight} from "react-feather";


const ProfilePage = ({user, userActions}) => {
    const [changeNameVisible, setChangeNameVisibility] = useState(false);

    const toggleChangeNameVisibility = () => {
        setChangeNameVisibility(!changeNameVisible);
    };

    if (!user || !user._id){
        return <span>...</span>
    }

    const changeName = (newName) => {
        userActions.changeName(newName);
        setChangeNameVisibility(false);
    };

    return <div>
        <ChangeNameDialog changeName={changeName} onClose={toggleChangeNameVisibility} user={user} visible={changeNameVisible}/>
        <List>
            <ListItem onClick={toggleChangeNameVisibility}>
                Name
                <ListItemSuffix>{user.displayName}</ListItemSuffix>
            </ListItem>
            <ListItem>
                Pin / Farbe
                <ListItemSuffix>
                    <UserPin user={user} />
                    <ColorDot color={user.metadata.pin_color} />
                </ListItemSuffix>
            </ListItem>
            <ListItem>
                Erfolge
                <ListItemSuffix icon={true}>
                    <ChevronRight />
                </ListItemSuffix>
            </ListItem>
            <ListItem>
                Konto anlegen
            </ListItem>
            <ListItem>
                Einstellungen
                <ListItemSuffix icon={true}>
                    <ChevronRight />
                </ListItemSuffix>
            </ListItem>
        </List>
    </div>
};

function mapStateToProps(state) {
    return {user: state.user};
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(allUserActions, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));
