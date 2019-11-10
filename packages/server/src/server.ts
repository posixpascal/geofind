import {RedisPresence, Server} from "colyseus";
import {MongooseDriver} from "colyseus/lib/matchmaker/drivers/MongooseDriver";
import {createServer} from "http";
import app from "./app";
import {CountriesGameRoom} from "./rooms/countries.game";
import {LobbyRoom} from "./rooms/lobby";
import {StreetviewGameRoom} from "./rooms/streetview.game";
import logger from "./util/logger";
import "./util/secrets";

const gameServer = new Server({
    presence: new RedisPresence({
        url: process.env.LOCAL_REDIS_URI,
    }),
    express: app,
    server: createServer(app),
    driver: new MongooseDriver(process.env.LOCAL_MONGODB_URI),
});

gameServer.define("lobby", LobbyRoom).sortBy({clients: 1}).on("create", (room) => {
    logger.debug("Room created: " + room.roomId);
});

gameServer
    .define("game_countries", CountriesGameRoom, {mode: "countries"})
    .sortBy({clients: 1});

gameServer
    .define("game_streetview", StreetviewGameRoom, {mode: "streetview"})
    .sortBy({clients: 1});

gameServer.listen(3001, app.get("hostname"), 30, () => {
    logger.info("  App is running at http://localhost:%d in %s mode", 3001, app.get("env"));
});
