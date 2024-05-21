const mysql = require('mysql2');
const dbConfig = require("./config/db.config");

const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port
});

const connection = pool.promise();

module.exports = connection;