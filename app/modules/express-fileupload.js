const fileupload = require("express-fileupload");
const path = require("path");
const { createPathDirectory } = require("./functions");
const uploadFile = async (req, res, next) => {
  try {
    if (Object.keys(req.files).length == 0) {
      throw { status: 400, message: "please upload the project picture" };
    }
    let { image } = req.files;
    const imagePath = path.join(
      createPathDirectory(),
      Date.now() + path.extname(image.name)
    );
    req.body.image = imagePath;
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
