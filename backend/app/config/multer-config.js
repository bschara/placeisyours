const multer = require("multer");
const path = require("path");
// const fs = require("fs");
// console.log("Contents: ", fs.readdirSync("../file_storage/"));

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../file_storage"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

// var multerStorage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, path.join(__dirname, "my_uploads"));
//   },
//   filename: function (req, file, callback) {
//     callback(null, Date.now() + "_" + file.originalname);
//   },
// });
