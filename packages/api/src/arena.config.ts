import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";

/**
 * Import your Room files
 */
import { CountryRoom } from "./rooms/CountryRoom";
import { client, getCountries, getRandomCountry, seed } from "./db";
import { RedisPresence } from "colyseus";
import basicAuth from "express-basic-auth";

const basicAuthMiddleware = basicAuth({
  // list of users and passwords
  users: {
    admin: process.env.MONITOR_PASSWORD,
  },
  // sends WWW-Authenticate header, which will prompt the user to fill
  // credentials in
  challenge: true,
});

export default Arena({
  options: {
    // presence: new RedisPresence(),
  },
  getId: () => "geofind",

  initializeGameServer: async (gameServer) => {
    /**
     * Define your room handlers:
     */
    gameServer.define("countries", CountryRoom);
    await client.connect();
    //console.log(await seed());
  },

  initializeExpress: (app) => {
    /**
     * Bind your custom express routes here:
     */
    app.get("/", (req, res) => {
      res.send("It's time to kick ass and chew bubblegum!");
    });

    /**
     * Bind @colyseus/monitor
     * It is recommended to protect this route with a password.
     * Read more: https://docs.colyseus.io/tools/monitor/
     */
    app.use("/colyseus", basicAuthMiddleware, monitor());
  },

  beforeListen: () => {
    /**
     * Before before gameServer.listen() is called.
     */
  },
});
