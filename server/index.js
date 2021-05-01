const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const router = require("./router");

const app = express();

const PORT = process.env.PORT || 8888;
const FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:3000";
const FILES_FOLDER = path.join(__dirname, "files");

if (!fs.existsSync(FILES_FOLDER)) {
  fs.mkdirSync(FILES_FOLDER);
}

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(
  cors({
    origin: [FRONTEND_URI, "https://master--contest-tracker.netlify.app"],
    credentials: true
  })
);

app.get("/", (req, res) => {
  res.status(200).sendFile(path.dirname(__filename) + "/assets/index.html");
});
app.get("/health", (req, res) => {
  res.status(200).send({ message: "I'm alive" });
});
app.use("/static", express.static(__dirname + "/files"));
app.use("/api", router);

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
