const mongoose = require("mongoose");

const timeSlot = new mongoose.Schema({ start: Date, end: Date });

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  availability: {
    type: [timeSlot],
    default: []
  },
  photo: {
    type: String,
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
