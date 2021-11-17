const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeSlot = new Schema({ start: Date, end: Date });

const requestSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  sitterId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  duration: {
    type: timeSlot,
    required: true,
  },
  accepted: {
    type: Boolean,
    default: null,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
    default: "",
  },
  viewed: {
    type: Boolean,
    default: false,
  },
});

module.exports = Request = mongoose.model("Request", requestSchema);
