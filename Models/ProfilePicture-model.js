const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProfilePicture = new Schema(
  {
    FileName: {
      type: String,
      required: true,
    },
    User: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

const ProfilePictures = mongoose.model("ProfilePicture", ProfilePicture);

module.exports = ProfilePictures;
