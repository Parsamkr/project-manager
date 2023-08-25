const multer = require("multer");
const path = require("path");
const { createPathDirectory } = require("./functions");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, createPathDirectory());
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file?.originalname || "");
    const whiteListFormat = [".png", ".webp", ".jpeg", ".jpg"];
    if (whiteListFormat.includes(ext)) {
      const fileName = Date.now() + ext;
      cb(null, fileName);
    } else {
      cb(new Error("allowed formats : '.png .webp .jpeg .jpg' "));
    }
  },
});

const upload_multer = multer({ storage });
module.exports = { upload_multer };
