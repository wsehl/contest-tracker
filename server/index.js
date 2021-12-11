require("dotenv").config();
require("module-alias/register");
const express = require("express");
const cors = require("cors");
const path = require("path");
const router = require("./routes/router");
const logger = require("~utils/logger.js");

const PORT = process.env.PORT || 8889;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3001";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: [FRONTEND_URL], credentials: true }));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.dirname(__filename) + "/assets/index.html");
});
app.get("/health", (req, res) => {
  res.status(200).send({ message: "I'm alive" });
});

app.use("/api", router);

app.listen(PORT, () => {
  logger.info(`App is running on: http://localhost:${PORT}`);
});
