const mysql = require("mysql2");

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_NAME = process.env.DB_NAME || "contest-tracker-v2";
const DB_PASS = process.env.DB_PASS || "root";

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASS,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) console.log(err);
  if (connection) console.log("[module] Database succesfully connected");
});

module.exports = db;
