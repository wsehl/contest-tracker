require("dotenv").config();
require("module-alias/register");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const router = require("./api/router");
const logger = require("~services/logger");

const PORT = process.env.PORT || 8888;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const URL_WHITELIST = [FRONTEND_URL];

const app = express();

app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: URL_WHITELIST, credentials: true }));

app.use("/api", router);

app.listen(PORT, () => {
  logger.info(`App is running on: http://localhost:${PORT}`);
});
