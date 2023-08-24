const { UserModel } = require("../../models/user");
const { jwtTokenValidator } = require("../../modules/functions");

const checkLogin = async (req, res, next) => {
  try {
    let authError = { status: 401, message: "please login to your account" };

    const authorization = req?.headers?.authorization;
    if (!authorization) throw authError;
    let token = authorization.split(" ")?.[1];
    if (!token) throw authError;
    const result = jwtTokenValidator(token);
    const { username } = result;
    console.log(result);
    const user = await UserModel.findOne({ username }, { password: 0 });
    if (!user) throw authError;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { checkLogin };
