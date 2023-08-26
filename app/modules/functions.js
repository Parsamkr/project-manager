const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const { ProjectModel } = require("../models/project");

function hashString(str) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
}

function tokenGenerator(payload) {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "365 days",
  });
  return token;
}

function jwtTokenValidator(token) {
  const result = jwt.verify(token, process.env.SECRET_KEY);
  if (!result?.username) {
    throw { status: 401, message: "please login to your account" };
  }
  return result;
}

function createPathDirectory() {
  let d = new Date();
  const Year = d.getFullYear() + "";
  const Month = d.getMonth() + "";
  const Day = d.getDate() + "";
  const uploadPath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "upload",
    Year,
    Month,
    Day
  );
  fs.mkdirSync(uploadPath, { recursive: true });
  return path.join("public", "upload", Year, Month, Day);
}

async function findProject(projectID, owner) {
  const project = await ProjectModel.findOne({ owner, _id: projectID });
  if (!project) throw { status: 404, message: "you have no projects" };
  return project;
}

module.exports = {
  hashString,
  tokenGenerator,
  jwtTokenValidator,
  createPathDirectory,
  findProject,
};
