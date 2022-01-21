const { Client } = require('pg')
process.env.PGSSLMODE = process.env.NO_SSL ? '' : 'require'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = String(0)
let sslConfig: any = {
  ssl: {
    rejectUnauthorized: false,
  },
  dialectOptions: {
    rejectUnauthorized: false,
    ssl: {
      require: true,
      // Ref.: https://github.com/brianc/node-postgres/issues/2009
      rejectUnauthorized: false,
    },
    keepAlive: true,
  },
}

if (process.env.NO_SSL) {
  sslConfig = {}
}

export const client = new Client({
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'root',
  database: 'geofind',
  ssl: false,
  //...sslConfig,
})

//export const client = new Client({
//  host: process.env.DB_HOST,
//  port: process.env.DB_PORT,
//  user: process.env.DB_USER,
//  password: process.env.DB_PASSWORD,
//  database: process.env.DB_DATABASE,
//  sslConfig,
//});
//
