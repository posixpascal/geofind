import {
    LOBBY_JOIN,
    USER_LIST_LOBBY,
    LOBBY_MESSAGE,
    USER_JOINED_LOBBY,
    USER_LEFT_LOBBY,
    LOBBY_LEAVE, LOBBY_UPDATE
} from "../actions/types";

// @ts-ignore
export default (state: IRoom | boolean = false, action) => {
    switch (action.type) {
        case LOBBY_JOIN:
            (window as any).currentRoom = action.payload;
            return {type: action.payload.name, id: action.payload.id, roomState: {...action.payload.serializer.state}};

        case LOBBY_UPDATE:
            if (!action.payload.$changed) {
                return state;
            }
            return {...state, roomState: {...state.roomState, ...action.payload}};

        case LOBBY_LEAVE:
            if ((window as any).currentRoom) { // user is in room
                (window as any).currentRoom.leave();
                (window as any).currentRoom = null;
            }
            return false;
    }

    return state;
}
