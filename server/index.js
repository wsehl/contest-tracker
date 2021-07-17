require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const router = require("./routes/router");

const PORT = process.env.PORT || 8889;
const WHITE_LIST = process.env.URI_LIST.split(",");
const FILES_FOLDER = path.join(__dirname, "files");

if (!fs.existsSync(FILES_FOLDER)) fs.mkdirSync(FILES_FOLDER);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: WHITE_LIST, credentials: true }));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.dirname(__filename) + "/assets/index.html");
});
app.get("/health", (req, res) => {
  res.status(200).send({ message: "I'm alive" });
});
app.use("/static", express.static(__dirname + "/files"));
app.use("/api", router);

app.listen(PORT, () => {
  console.info(`[up] App is running on: http://localhost:${PORT}`);
});
