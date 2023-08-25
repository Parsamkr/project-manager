const { body } = require("express-validator");
const path = require("path");

function imageValidator() {
  return [
    body("image").custom((image, { req }) => {
      if (Object.keys(req.file).length == 0) {
        throw "please select an image";
      }
      const ext = path.extname(req.file?.originalname || "");
      const whiteListFormat = [".png", ".webp", ".jpeg", ".jpg"];
      if (!whiteListFormat.includes(ext)) {
        throw "allowed formats : '.png .webp .jpeg .jpg'";
      }
      const maxSize = 2 * 1024 * 1024;
      if (req.file.size > maxSize) {
        throw "image cannot be bigger than 2MB";
      }
      return true;
    }),
  ];
}
module.exports = { imageValidator };
