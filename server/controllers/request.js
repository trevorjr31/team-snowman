const Request = require("../models/Request");
const User = require("../models/User");
const organizeRequests = require("../utils/organizeRequests");
const asyncHandler = require("express-async-handler");

// @route POST /request
// @desc create a new pet sitting request
// @access Private
exports.makeRequest = asyncHandler(async (req, res, next) => {
  const body = req.body;
  const sitter = await User.findById(body.sitterId);
  if (!sitter) {
    res.status(404);
    throw new Error("Sitter doesn't exist");
  }
  if (Date.parse(body.duration.end) < Date.parse(body.duration.start)) {
    res.status(400);
    throw new Error("Bad Request");
  }
  const newRequest = await Request.create({
    ownerId: req.user.id,
    sitterId: body.sitterId,
    duration: {
      start: new Date(body.duration.start),
      end: new Date(body.duration.end),
    },
  });
  if (newRequest) {
    res.status(200).json({
      success: {
        request: newRequest,
      },
    });
  } else {
    res.status(500);
    throw new Error("Error creating request");
  }
});

// @route GET /request
// @desc Get requests for a logged in user
// @access Private
exports.getRequest = asyncHandler(async (req, res, next) => {
  const requests = await Request.find({ sitterId: req.user.id });
  const processedRequests = await organizeRequests(requests);
  res.status(200).json({
    success: {
      requests: processedRequests,
    },
  });
});

// @route PATCH /request
// @desc Update a user's request
// @access Private
exports.editRequest = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const body = req.body;
  const verifyUser = await Request.findOne({ _id: body._id });

  if (req.user.id != (verifyUser.ownerId || verifyUser.sitterId)) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const updatedRequest = await Request.findOneAndUpdate(
    { _id: body._id },
    body,
    { new: true }
  );
  if (updatedRequest) {
    const requests = await Request.find({ sitterId: req.user.id });
    const processedRequests = await organizeRequests(requests);
    res.status(200).json({
      success: {
        updatedRequests: processedRequests,
      },
    });
  } else {
    res.status(500);
    throw new Error("Error updating request");
  }
});
