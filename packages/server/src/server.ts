import {CapitalsGameRoom} from "./rooms/capitals.game";

require('dotenv').config()
import {RedisPresence, Server} from "colyseus";
import {MongooseDriver} from "colyseus/lib/matchmaker/drivers/MongooseDriver";
import {createServer} from "http";
import app from "./app";
import {CountriesGameRoom} from "./rooms/countries.game";
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

gameServer
    .define("game_countries", CountriesGameRoom, {mode: "countries"})
    .sortBy({clients: 1});

gameServer
    .define("game_capitals", CapitalsGameRoom, {mode: "countries"})
    .sortBy({clients: 1});

gameServer.listen(3001, app.get("hostname"), 30, () => {
    logger.info("  App is running at http://localhost:%d in %s mode", 3001, app.get("env"));
});
