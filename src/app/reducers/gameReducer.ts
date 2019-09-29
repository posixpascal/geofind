import {GAME_END, GAME_START, GAME_UPDATE} from "../actions/types";

// @ts-ignore
export default function(state = {users: []}, action) {
    switch (action.type){
        case GAME_START:
            break;

        case GAME_END:
            break;

        case GAME_UPDATE:
            return {...action.payload};
    }

    return state;
}
