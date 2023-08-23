const { body } = require("express-validator");
const { UserModel } = require("../../models/user");
function registerValidator() {
  return [
    body("username").custom(async (value, context) => {
      if (value) {
        const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,25}/gi;
        if (usernameRegex.test(value)) {
          const user = await UserModel.findOne({ username: value });
          if (user) throw "username already used!";
          return true;
        }
        throw "username is wrong";
      } else {
        throw "username can't be empty";
      }
    }),
    body("email")
      .isEmail()
      .withMessage("email is wrong")
      .custom(async (email) => {
        const user = await UserModel.findOne({ email });
        if (user) throw "email already used!";
        return true;
      }),
    body("mobile")
      .isMobilePhone("fa-IR")
      .withMessage("mobile is wrong")
      .custom(async (mobile) => {
        const user = await UserModel.findOne({ mobile });
        if (user) throw "email already used!";
        return true;
      }),
    body("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("password should be between 6 and 16 characters")
      .custom((value, context) => {
        if (!value) throw "password can't be empty";
        if (value !== context?.req?.body?.confirm_password) {
          console.log(context?.req?.body?.confirm_password, value);
          throw "password and confirm password aren't the same";
        }
        return true;
      }),
  ];
}

module.exports = { registerValidator };
