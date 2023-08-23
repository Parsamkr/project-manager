const { default: mongoose } = require("mongoose");
const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    users: { type: [mongoose.type.ObjectId], default: [] },
    owner: { type: mongoose.type.ObjectId, required: true },
  },
  { timestamps: true }
);

const TeamModel = mongoose.model("team", TeamSchema);
module.exports = { TeamModel };
