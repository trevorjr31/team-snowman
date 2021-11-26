const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const message = new Schema({
  firstName: String,
  lastName: String,
  message: String,
  date: Date,
});

const conversationSchema = new Schema({
  requestId: {
    type: Schema.Types.ObjectId,
    ref: "Request",
    required: true,
  },
  messages: {
    type: [message],
  },
});

module.exports = Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);
