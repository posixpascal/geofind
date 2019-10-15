import "./util/secrets";
import logger from "./util/logger";
import app from "./app";
import {Server, RedisPresence} from "colyseus";
import {createServer} from "http";
import {LobbyRoom} from "./rooms/lobby";
import {CountriesGameRoom} from "./rooms/countries.game";
import {StreetviewGameRoom} from "./rooms/streetview.game";
import {AnimalsGameRoom} from "./rooms/animals.game";
import {ShapeGuessingGameRoom} from "./rooms/shapeguessing.game";
import {BuildingsGameRoom} from "./rooms/buildings.game";
import {MongooseDriver} from "colyseus/lib/matchmaker/drivers/MongooseDriver";

const gameServer = new Server({
    presence: new RedisPresence({
        url: process.env.LOCAL_REDIS_URI
    }),
    express: app,
    server: createServer(app),
    driver: new MongooseDriver(process.env.LOCAL_MONGODB_URI)
});

gameServer.define("lobby", LobbyRoom).sortBy({clients: 1}).on("create", (room) => {
    logger.debug("Room created: " + room.roomId)
});

gameServer
    .define("game_countries", CountriesGameRoom, {mode: "countries"})
    .sortBy({clients: 1});

gameServer
    .define("game_streetview", StreetviewGameRoom, {mode: "streetview"})
    .sortBy({clients: 1});

gameServer
    .define("game_shapeguessing", ShapeGuessingGameRoom, {mode: "streetview"})
    .sortBy({clients: 1});

gameServer
    .define("game_animals", AnimalsGameRoom, {mode: "animals"})
    .sortBy({clients: 1});

gameServer
    .define("game_buildings", BuildingsGameRoom, {mode: "buildings"})
    .sortBy({clients: 1});

gameServer.listen(app.get("port"), app.get("hostname"), 30, () => {
    logger.info("  App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
});
