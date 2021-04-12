const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const router = require("./router");

const PORT = process.env.PORT || 8888;
const folder = path.join(__dirname, "files");

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

app.listen(PORT);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use("/api", router);

console.log(`App listening on port: ${PORT}`);
