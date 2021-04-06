const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8888;
app.listen(PORT);

app.use(bodyParser.json());
app.use(cors());

const router = require("./router");
app.use("/api", router);

console.log(`App listening on port: ${PORT}`);