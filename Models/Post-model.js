const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Post = new Schema(
  {
    Desc: {
      type: String,
    },
    Titlle: {
      type: String,
    },
    Date: {
      type: Date,
      default: true,
    },
    IdFiles: {
      type: Number,
    },
    FileName: [],
  },

  { timestamps: true }
);

const Posts = mongoose.model("Post", Post);

module.exports = Posts;
