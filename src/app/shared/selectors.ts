import {client} from "../helper/webSockets";

export const arePlayersReady = (room) => {
    if (!room) {
        return false;
    }

    let allReady = true;
    for (let playerID in room.players) {
        if (!room.players.hasOwnProperty(playerID)){
            continue;
        }

        allReady = allReady && room.players[playerID].isReady;
    }
    return allReady;
};

export const isRoomLeader = (room) => {
    return room && room.leader === client.auth._id;
};
