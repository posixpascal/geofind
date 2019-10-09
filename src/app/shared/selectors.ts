import {client} from "../helper/webSockets";

export const arePlayersReady = (room) => {
    let allReady = false;
    if (room) { // room might be in initializing state.
        allReady = true;
        for (let player in room.players) {
            if (room.players[player].isReady) {
                allReady = false;
            }
        }
    }
    return allReady;
};

export const isRoomLeader = (room) => {
   return room && room.leader === client.auth._id;
};
