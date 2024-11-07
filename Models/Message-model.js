const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Message = new Schema(
  {
    Nom: {
      type: String,
    },
    Mail: {
      type: String,
    },
    Phone: {
      type: String,
    },
    Text: {
      type: String,
    },
    UserDevice: {
      type: String,
    },
    Position: [],
  },

  { timestamps: true }
);

const Messages = mongoose.model("Message", Message);

module.exports = Messages;
