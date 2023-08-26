const { ProjectController } = require("../http/controllers/project.controller");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { createProjectValidator } = require("../http/validations/project");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { uploadFile } = require("../modules/express-fileupload");
const fileUpload = require("express-fileupload");
const { mongoIDValidator } = require("../http/validations/public");

const router = require("express").Router();

router.post(
  "/create",
  fileUpload(),
  checkLogin,
  createProjectValidator(),
  expressValidatorMapper,
  uploadFile,
  ProjectController.createProject
);

router.get("/list", checkLogin, ProjectController.getAllProject);
router.get(
  "/:id",
  checkLogin,
  mongoIDValidator(),
  expressValidatorMapper,
  ProjectController.getProjectById
);
router.delete(
  "/remove/:id",
  checkLogin,
  mongoIDValidator(),
  expressValidatorMapper,
  ProjectController.removeProject
);
router.put(
  "/edit/:id",
  checkLogin,
  mongoIDValidator(),
  expressValidatorMapper,
  ProjectController.updateProject
);


router.patch(
  "/edit-image/:id",
  fileUpload(),
  checkLogin,
  mongoIDValidator(),
  expressValidatorMapper,
  uploadFile,
  ProjectController.updateProjectImage
);

router.patch(
  "/edit-image/:id",
  fileUpload(),
  checkLogin,
  mongoIDValidator(),
  expressValidatorMapper,
  uploadFile,
  ProjectController.updateProjectImage
);

module.exports = { projectRoutes: router };
