const { ProjectModel } = require("../../models/project");
const {
  findProject,
  checkEntries,
  createLinkForFiles,
} = require("../../modules/functions");

class ProjectController {
  async createProject(req, res, next) {
    try {
      const { title, text, image, tags } = req.body;
      const owner = req.user._id;
      const result = await ProjectModel.create({
        title,
        text,
        owner,
        image,
        tags,
      });
      if (!result) {
        throw { status: 400, message: "project failed to create" };
      }
      return res.status(201).json({
        status: 201,
        success: true,
        message: "project created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllProject(req, res, next) {
    try {
      const owner = req.user._id;
      const projects = await ProjectModel.find({ owner });
      for (const project of projects) {
        project.image = createLinkForFiles(project.image, req);
      }
      return res.status(200).json({ status: 200, success: true, projects });
    } catch (error) {
      next(error);
    }
  }

  async getProjectById(req, res, next) {
    try {
      const owner = req.user._id;
      const projectID = req.params.id;
      const project = await findProject(projectID, owner);
      project.image = createLinkForFiles(project.image, req);
      return res.status(200).json({ status: 200, success: true, project });
    } catch (error) {
      next(error);
    }
  }
  async removeProject(req, res, next) {
    try {
      const owner = req.user._id;
      const projectID = req.params.id;
      await findProject(projectID, owner);
      const deleteProjectResult = await ProjectModel.deleteOne({
        _id: projectID,
      });
      if (deleteProjectResult.deletedCount == 0) {
        throw {
          status: 400,
          success: false,
          message: "project failed to delete",
        };
      }
      return res.status(200).json({
        status: 200,
        success: true,
        message: "project deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProject(req, res, next) {
    try {
      const owner = req.user._id;
      const projectID = req.params.id;
      await findProject(projectID, owner);
      const data = { ...req.body };
      let fields = ["title", "text", "tags"];
      let badValues = ["", " ", null, undefined, 0, -1, NaN];
      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) {
          delete data[key];
        }
        if (badValues.includes(value)) {
          delete data[key];
        }
        if (key == "tags" && data["tags"].constructor === Array) {
          data["tags"] = data["tags"].filter((val) => {
            if (!badValues.includes(val)) return val;
          });
        }
      });

      const updateResult = await ProjectModel.updateOne(
        { _id: projectID },
        { $set: data }
      );

      if (updateResult.modifiedCount == 0) {
        throw { status: 400, message: "something was wrong , nothing changed" };
      }
      return res.status(200).json({
        status: 200,
        success: true,
        message: "project successfully updated",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProjectImage(req, res, next) {
    try {
      const { image } = req.body;
      const owner = req.user._id;
      const projectID = req.params.id;
      await findProject(projectID, owner);
      const updateImageResult = await ProjectModel.updateOne(
        { _id: projectID },
        { $set: { image } }
      );
      if (updateImageResult.modifiedCount == 0)
        throw { status: 400, message: "image failed to update" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "project image successfully changed",
      });
    } catch (error) {
      next(error);
    }
  }
  getProjectOfTeam() {}
  getProjectOfUser() {}
}

module.exports = { ProjectController: new ProjectController() };
