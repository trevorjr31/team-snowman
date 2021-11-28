const mongoose = require("mongoose");

const timeSlot = new mongoose.Schema({ start: Date, end: Date });

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
  },
  photo: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  isSitter: {
    type: Boolean,
    default: false,
  },
  hourlyRate: {
    type: Number,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  defaultPaymentMethod: {
    type: String,
    default: "",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
