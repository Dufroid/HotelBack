const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Notification = new Schema(
  {
    IdMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },

    isRead: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isDelete: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    TypeNoti: {
      type: String,
    },
  },

  { timestamps: true }
);

const Notifications = mongoose.model("Notification", Notification);

module.exports = Notifications;
