const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Login = new Schema(
  {
    PassWord: {
      type: String,
      required: true,
    },
    PhoneMail: {
      type: String,
      required: true,
      unique: true,
    },
     User:
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
  },

  { timestamps: true }
);

const Logins = mongoose.model("Login", Login);

module.exports = Logins;
