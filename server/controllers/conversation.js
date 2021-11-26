const Conversation = require("../models/Conversation");
const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");

// @route POST /conversation/
// @desc creates empty conversation
// @access Private
exports.createConversation = asyncHandler(async (req, res) => {
  const { requestId } = req.body;
  const newConversation = await Conversation.create(
    { requestId: requestId },
    (err, doc) => {
      if (err) {
        res.status(400);
        throw new Error(err);
      }
      res.status(200).json({
        conversationId: newConversation._id,
      });
    }
  );
});
