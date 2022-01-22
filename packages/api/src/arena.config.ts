import Arena from '@colyseus/arena'
import { monitor } from '@colyseus/monitor'

/**
 * Import your Room files
 */
import { CountryRoom } from './rooms/CountryRoom'
import { RedisPresence } from 'colyseus'
import basicAuth from 'express-basic-auth'
import { client } from './db/client'
import { QuizRoom } from './rooms/QuizRoom'
import { SpeedrunRoom } from './rooms/SpeedrunRoom'

const basicAuthMiddleware = basicAuth({
  // list of users and passwords
  users: {
    admin: process.env.MONITOR_PASSWORD,
  },
  // sends WWW-Authenticate header, which will prompt the user to fill
  // credentials in
  challenge: true,
})

export default Arena({
  options: {
    // presence: new RedisPresence(),
  },
  getId: () => 'geofind',

  initializeGameServer: async (gameServer) => {
    /**
     * Define your room handlers:
     */
    gameServer.define('countries', CountryRoom)
    gameServer.define('capitals', CountryRoom)
    gameServer.define('flags', CountryRoom)
    gameServer.define('quizroom', QuizRoom)
    gameServer.define('speedrun', SpeedrunRoom)
  },

  initializeExpress: (app) => {
    /**
     * Bind your custom express routes here:
     */
    app.get('/', (req, res) => {
      res.send("It's time to kick ass and chew bubblegum!")
    })

    /**
     * Bind @colyseus/monitor
     * It is recommended to protect this route with a password.
     * Read more: https://docs.colyseus.io/tools/monitor/
     */
    app.use('/colyseus', basicAuthMiddleware, monitor())
  },

  beforeListen: async () => {
    await client.connect()
  },
})
