import {LOBBIES_LIST} from "../actions/types";

// @ts-ignore
export default function(state = [], action) {
    if (action.type === LOBBIES_LIST) {
        return action.payload;
    }

    return state;
}
