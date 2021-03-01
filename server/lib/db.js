const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "node-jwt",
  password: "",
});
connection.connect();
module.exports = connection;
