const path = require("path");
const { createPathDirectory } = require("./functions");
const uploadFile = async (req, res, next) => {
  try {
    if (Object.keys(req.files).length == 0) {
      throw { status: 400, message: "please upload the project picture" };
    }
    let { image } = req.files;
    const ext = path.extname(image.name || "");
    const whiteListFormat = [".png", ".webp", ".jpeg", ".jpg"];
    if (!whiteListFormat.includes(ext)) {
      throw `allowed formats : '.png .webp .jpeg .jpg'`;
    }
    const maxSize = 2 * 1024 * 1024;
    if (image.size > maxSize) {
      throw "image cannot be bigger than 2MB";
    }
    const imagePath = path.join(
      createPathDirectory(),
      Date.now() + path.extname(image.name)
    );
    req.body.image = imagePath.substring(7);
    let uploadPath = path.join(__dirname, "..", "..", imagePath);
    image.mv(uploadPath, (err) => {
      if (err) throw { status: 500, message: "image failed to upload" };
      next();
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { uploadFile };
