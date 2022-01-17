const dotenv = require("dotenv");

dotenv.config({
  path: "./development.env",
});

module.exports = {
  development: {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};
