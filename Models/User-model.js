const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema(
  {
    Names: {
      type: String,
    },
    Code: {
      type: String,
    },
    User: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    SelectedLang: {
      type: String,
      default: "French",
    },
  },

  { timestamps: true }
);

const Users = mongoose.model("User", User);

module.exports = Users;
