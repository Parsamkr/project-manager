const { default: mongoose } = require("mongoose");
const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    image: {
      type: String,
      default: "/defaults/default.webp",
    },
    owner: { type: mongoose.type.ObjectId, required: true },
    team: { type: mongoose.type.ObjectId },
    Private: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", ProjectSchema);
module.exports = { ProjectModel };
