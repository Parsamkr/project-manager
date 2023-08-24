const { UserModel } = require("../../models/user");
const { hashString, tokenGenerator } = require("../../modules/functions");
const bcrypt = require("bcrypt");

class AuthController {
  async register(req, res, next) {
    try {
      const { username, password, email, mobile } = req.body;
      const hash_password = hashString(password);
      const user = await UserModel.create({
        username,
        email,
        password: hash_password,
        mobile,
      });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (!user) {
        throw { status: 401, message: "username or password is wrong!" };
      }
      const compareResult = bcrypt.compareSync(password, user.password);
      if (!compareResult) {
        throw { status: 401, message: "username or password is wrong!" };
      }
      const token = tokenGenerator({ username });
      user.token = token;
      await user.save();
      return res.status(200).json({
        status: 200,
        success: true,
        message: "logged in successfully",
        token,
      });
    } catch (error) {
      next(error);
    }
  }
  resetPassword() {}
}

module.exports = { AuthController: new AuthController() };
