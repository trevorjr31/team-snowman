const Request = require("../models/Request");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route POST /request
// @desc create a new pet sitting request
// @access Private
exports.makeRequest = asyncHandler(async (req, res) => {
  const body = req.body;
  if (!(body || body.sitterId || body.ownerId || body.duration)) {
    res.status(400);
    throw new Error("Bad Request");
  }
  const sitter = await User.findById(body.sitterId);
  if (!sitter) {
    res.status(404);
    throw new Error("Sitter doesn't exist");
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
exports.getRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find({
    ownerId: userId,
    sitterId: req.user.id,
  });
  res.status(200).json({
    success: {
      requests,
    },
  });
});

// @route PATCH /request
// @desc Update a user's request
// @access Private
exports.editRequest = asyncHandler(async (req, res, next) => {
  const bodyData = ({
    duration,
    accepted,
    totalCost,
    completed,
    notes,
    viewed,
  } = req.body);
  const newRequestData = {
    ...req.params,
    ...bodyData,
  };
  if (!(newRequestData || newRequestData.id || newRequestData.accepted)) {
    res.status(400);
    throw new Error("Bad Request");
  }
  const verifyUser = await Request.findOne({ _id: newRequestData.id });

  if (req.user.id != (verifyUser.ownerId || verifyUser.sitterId)) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const updatedRequest = await Request.findOneAndUpdate(
    { _id: newRequestData.id },
    newRequestData,
    { new: true }
  );
  if (updatedRequest) {
    res.status(200).json({
      success: {
        updatedRequest,
      },
    });
  } else {
    res.status(500);
    throw new Error("Error updating request");
  }
});
