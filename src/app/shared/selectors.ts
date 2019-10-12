import {client} from "../helper/webSockets";

export const arePlayersReady = (room) => {
    if (!room) {
        return false;
    }

    let allReady = true;
    for (const playerID in room.players) {
        if (!room.players.hasOwnProperty(playerID)) {
            continue;
        }

        allReady = allReady && room.players[playerID].isReady;
    }
    return allReady;
};

export const isRoomLeader = (room) => {
    return room && room.leader === client.auth._id;
};

export const isGameLeader = (game) => {
    let isLeader = false;
    for (const playerId in game.players) {
        if (!game.players.hasOwnProperty(playerId)) {
            continue;
        }

        if (game.leader === game.players[playerId].id) {
            isLeader = true;
        }
    }
    return isLeader;
};

export const getCurrentPlayer: any = (game) => {
    let user = false;
    for (const playerId in game.players) {
        if (!game.players.hasOwnProperty(playerId)) {
            continue;
        }
        if (game.players[playerId].id === client.auth._id) {
            user = game.players[playerId];
        }
    }
    return user;
};

export const scoreBoardForGame = (game) => {
    return game.players.map((playerID) => {
        const player = game.players[playerID];
        const playerScore = game.scoreBoard[playerID];
        return {player, playerScore};
    });
};
