import {
    LOBBY_JOIN,
    USER_LIST_LOBBY,
    LOBBY_MESSAGE,
    USER_JOINED_LOBBY,
    USER_LEFT_LOBBY,
    LOBBY_LEAVE, LOBBY_UPDATE
} from "../actions/types";

const initialState = {
    lobby: false,
    users: [],
    chatMessages: []
};

// @ts-ignore
export default function (state = initialState, action) {
    switch (action.type) {
        case LOBBY_UPDATE:
            return {...state, lobby: {...(state.lobby as any), ...action.payload}};

        case LOBBY_JOIN:
            return {...state, lobby: action.payload};

        case LOBBY_LEAVE:
            return {...state, lobby: false};

        case USER_LIST_LOBBY:
            return {...state, users: [...action.payload]};

        case LOBBY_MESSAGE:
            return {...state, chatMessages: [...state.chatMessages, action.payload]};

        case USER_JOINED_LOBBY:
            return {...state, users: [...state.users, action.payload]};

        case USER_LEFT_LOBBY:
            return {...state, users: state.users.filter(user => user.id !== action.payload.id)};
    }

    return state;
}
