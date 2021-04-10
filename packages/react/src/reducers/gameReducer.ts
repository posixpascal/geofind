import {GAME_JOIN, GAME_LEAVE, GAME_UPDATE} from "../actions/types";

// @ts-ignore
export default function(state = {users: []}, action) {
    switch (action.type) {
        case GAME_JOIN:
            return {mode: action.payload.name, id: action.payload.id, gameState: {...action.payload.serializer.state}};

        case GAME_LEAVE:
            if ((window as any).currentRoom) { // user is in room
                (window as any).currentRoom.leave();
                (window as any).currentRoom = null;
            }
            return false;

        case GAME_UPDATE:
            return {...action.payload};
    }

    return state;
}
