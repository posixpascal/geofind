import {GAME_END, GAME_JOIN, GAME_LEAVE, GAME_START, GAME_UPDATE, LOBBY_JOIN, LOBBY_LEAVE} from "../actions/types";

// @ts-ignore
export default function(state = {users: []}, action) {
    switch (action.type){
        case GAME_JOIN:
            (window as any).currentGame = action.payload;
            return {mode: action.payload.name, id: action.payload.id, gameState: {...action.payload.serializer.state}};

        case GAME_LEAVE:
            if ((window as any).currentGame) { // user is in room
                (window as any).currentGame.leave();
                (window as any).currentGame = null;
            }
            return false;

        case GAME_UPDATE:
            return {...action.payload};
    }

    return state;
}
