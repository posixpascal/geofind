import {
    LOBBY_JOIN,
    LOBBY_LEAVE,
    LOBBY_UPDATE,
} from "../actions/types";

// @ts-ignore
export default (state: IRoom | boolean = false, action) => {
    switch (action.type) {
        case LOBBY_JOIN:
            window.currentRoom = action.payload;
            return {type: action.payload.name, id: action.payload.id, roomState: {...action.payload.serializer.state}};

        case LOBBY_UPDATE:
            if (!action.payload.$changed) {
                return state;
            }
            return {...state, roomState: {...state.roomState, ...action.payload}};

        case LOBBY_LEAVE:
            if (window.currentRoom) { // user is in room
                window.currentRoom.leave();
                window.currentRoom = null;
            }
            return false;

        default:
            return state;
    }
}
