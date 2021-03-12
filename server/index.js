const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8888;
app.use(bodyParser.json());
app.use(cors());

const router = require("./router");
app.use("/api", router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
