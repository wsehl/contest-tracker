const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const router = require("./router");

const app = express();

const PORT = process.env.PORT || 8888;
const FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:3000";
const folder = path.join(__dirname, "files");

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
let corsOptions = {};
if (process.env.NODE_ENV == "production") {
  const whitelist = [FRONTEND_URI, "https://master--contest-tracker.netlify.app"];
  corsOptions = {
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (whitelist.indexOf(origin) === -1) {
        const message =
          "The CORS policy for this origin doesnt allow access from the particular origin. Origin:" + origin;
        return callback(message, false);
      }
      return callback(null, true);
    },
    credentials: true
  };
}
app.use(cors(corsOptions));

app.use("/static", express.static(__dirname + "/files"));
app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).sendFile(path.dirname(__filename) + "/assets/index.html");
});

app.listen(PORT, () => {
  console.info(`App listening on port: ${PORT}`);
});
