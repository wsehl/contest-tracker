const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const router = require("./router");

const app = express();

const PORT = process.env.PORT || 8888;
const folder = path.join(__dirname, "files");

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
