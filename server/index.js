const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv");

const db = mysql.createConnection(process.env.DATABASE_URL);
module.exports = db;

const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const PORT = 5000;
app.use(bodyParser.json());
app.use(cors(corsOptions));

const router = require("./router");
app.use("/api", router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
