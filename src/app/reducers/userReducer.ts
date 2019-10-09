import {ROUND_END, ROUND_START, USER_CONNECTED, USER_DISCONNECTED, USER_LOGGED_IN, USER_PING} from "../actions/types";

const initialState = {};
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
