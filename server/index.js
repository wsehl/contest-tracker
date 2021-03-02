const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const whitelist = [process.env.LOCAL_URL, process.env.PRODUCTION_URL];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors(corsOptions));

const router = require("./router");
app.use("/api", router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
