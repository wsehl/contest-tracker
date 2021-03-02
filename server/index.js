const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv");

const db = mysql.createConnection(process.env.DATABASE_URL);
module.exports = db;

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

const router = require("./router");
app.use("/api", router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
