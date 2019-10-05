import {ROUND_START, ROUND_END, USER_CONNECTED, USER_DISCONNECTED, USER_PING, USER_LOGGED_IN} from "../actions/types";

let initialState = {};
// @ts-ignore
export default function(state = initialState, action) {
    switch (action.type){
        case USER_LOGGED_IN:
            const newState = {...state, ...action.payload};
            return newState;

        case USER_DISCONNECTED:
            return false;
            break;

        case USER_PING:
            break;
    }

    return state;
}
