const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeSlot = new Schema({ start: Date, end: Date });

const requestSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sitter: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
