const { UserModel } = require("../../models/user");
const { hashString } = require("../../modules/functions");

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
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
  login() {}
  resetPassword() {}
}

module.exports = { AuthController: new AuthController() };
