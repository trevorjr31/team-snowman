const Request = require("../models/Request");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

//two helpers to process requests for frontend
const sortRequests = (listToSort) => {
  return listToSort.sort(function(reqA, reqB) {
    return Date.parse(reqA.duration.start) < Date.parse(reqB.duration.start);
  });
};
const getNext = (upcomingRequests) => {
  if (upcomingRequests.length > 0) {
    nextRequest = upcomingRequests.reduce(function(reqA, reqB) {
      return Date.parse(reqA.duration.start) <
        Date.parse(reqB.duration.start) && reqA.accepted
        ? reqA
        : reqB;
    });
    if (!nextRequest.accepted) {
      nextRequest = null;
    }
  }

  return nextRequest;
};

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
  const now = new Date();
  let before = [];
  let after = [];
  let nextRequest = null;
  const requests = await Request.find({ sitterId: req.user.id });
  for (let request of requests) {
    //Sort and process requests for the Frontend
    request = JSON.parse(JSON.stringify(request));
    const sitterInfo = await User.findById(request.sitterId);
    request.sitterInfo = {};
    request.sitterInfo.username = sitterInfo.username;
    request.sitterInfo.email = sitterInfo.email;

    if (Date.parse(now) < Date.parse(request.duration.start)) {
      after.push(request);
    } else {
      before.push(request);
    }
  }

  after = sortRequests(after);
  before = sortRequests(before);
  nextRequest = getNext(after);
  if (nextRequest) {
    after = after.filter((req) => {
      return req._id != nextRequest._id;
    });
  }

  res.status(200).json({
    success: {
      requests: { after, before, nextRequest },
    },
  });
});

// @route PATCH /request
// @desc Update a user's request
// @access Private
exports.editRequest = asyncHandler(async (req, res, next) => {
  const body = req.body;
  const verifyUser = await Request.findOne({ _id: body.id });

  if (req.user.id != (verifyUser.ownerId || verifyUser.sitterId)) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const updatedRequest = await Request.findOneAndUpdate(
    { _id: body.id },
    body,
    { new: true }
  );
  if (updatedRequest) {
    res.status(200).json({
      success: {
        updatedRequest: updatedRequest,
      },
    });
  } else {
    res.status(500);
    throw new Error("Error updating request");
  }
});
