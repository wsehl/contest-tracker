const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.info("Database successfully connected");
  }
});

module.exports = db;
