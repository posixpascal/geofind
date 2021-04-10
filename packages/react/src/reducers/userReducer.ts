import {USER_DISCONNECTED, USER_LOGGED_IN, USER_PING} from "../actions/types";

const initialState = {};
// @ts-ignore
export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {...state, ...action.payload};

        case USER_DISCONNECTED:
            return false;

        case USER_PING:
            break;
    }

    return state;
}
