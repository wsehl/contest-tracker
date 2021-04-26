const path = require("path");
const multer = require("multer");

const folder = path.join(__dirname, "files");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, folder);
  },
  filename: function(req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + extension);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
