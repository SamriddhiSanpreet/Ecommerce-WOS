require('dotenv').config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
