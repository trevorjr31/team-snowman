const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    data: {
      requestId: {
        type: Schema.Types.ObjectId,
        ref: "request",
        required: true,
      },
      firstName: { type: String, required: true },
      photo: { type: String, required: true },
      date: { type: String, required: true },
      duration: { type: Number, required: true },
    },
    read: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Notification = mongoose.model(
  "Notification",
  notificationSchema
);
