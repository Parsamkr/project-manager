const { param } = require("express-validator");

function mongoIDValidator() {
  return [param("id").isMongoId().withMessage("inputted id is not right")];
}

module.exports = { mongoIDValidator };
