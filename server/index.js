const express = require("express");
const cors = require("cors");
const formidable = require("formidable");
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
app.use(cors());
app.use("/api", router);

app.post("/upload", (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = folder;
  
  form.parse(req, (_, fields, files) => {
    console.log("\n-----------");
    console.log("Fields", fields);
    console.log("Received:", Object.keys(files));
    console.log();
    res.send("Thank you");
  });
});

console.log(`App listening on port: ${PORT}`);
