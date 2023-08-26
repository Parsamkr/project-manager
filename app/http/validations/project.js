const { body } = require("express-validator");

function createProjectValidator() {
  return [
    body("title").notEmpty().withMessage("project title cannot be empty"),
    body("text")
      .notEmpty()
      .withMessage("project text cannot be empty")
      .isLength({ min: 20 })
      .withMessage("project text cannot be less than 20 characters"),
    body("tags")
      .isArray({ min: 0, max: 10 })
      .withMessage("maximum number of hashtags are 10"),
  ];
}

module.exports = { createProjectValidator };
