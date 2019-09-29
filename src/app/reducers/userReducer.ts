import {ROUND_START, ROUND_END, USER_CONNECTED, USER_DISCONNECTED, USER_PING} from "../actions/types";

let initialState;
try {
    initialState = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};
} catch (e){
    initialState = {};
}
// @ts-ignore
export default function(state = initialState, action) {
    switch (action.type){
        case USER_CONNECTED:
            const newState = {...state, ...action.payload};
            localStorage.setItem("user", JSON.stringify(newState));
            return newState;

        case USER_DISCONNECTED:
            break;

        case USER_PING:
            break;
    }

    return state;
}
