const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "b24-be",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool.promise();
