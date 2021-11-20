const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = Notification = mongoose.model(
  "Notification",
  notificationSchema
);
