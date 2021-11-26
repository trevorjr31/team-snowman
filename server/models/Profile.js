const mongoose = require("mongoose");

const timeSlot = new mongoose.Schema({
  day: Date,
  startTime: Date,
  endTime: Date,
});

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  availability: {
    type: [timeSlot],
    default: [],
  },
  photo: {
    type: String,
    default: "",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
