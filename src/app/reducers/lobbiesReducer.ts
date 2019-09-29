import {LOBBIES_LIST} from "../actions/types";

// @ts-ignore
export default function(state = [], action) {
    switch (action.type){
        case LOBBIES_LIST:
            return action.payload;
    }

    return state;
}
