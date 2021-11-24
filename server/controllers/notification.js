const Notification = require("../models/Notification");
const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");

// @route POST /notification/
// @desc create notification
// @access Private
exports.createNotification = asyncHandler(async (req, res) => {
  const { type, data } = req.body;
  const userId = req.user.id;
  if (!data | !type | !userId) {
    res.status(400);
    throw new Error("Bad Request");
  }
  if (!type === ("message" || "newRequest" || "requestUpdate")) {
    res.status(400);
    throw new Error("Bad Request");
  }
  const newNotification = await Notification.create({
    type,
    userId,
    data,
  });

  if (newNotification) {
    result = await Notification.findById(newNotification._id).populate({
      path: "data",
      model: Request,
    });
    res.status(200).json({
      success: {
        notification: result,
      },
    });
  } else {
    res.status(500);
    throw new Error("Error handling request");
  }
});

// @route GET /notification
// @desc Get user profile data
// @access Private
exports.getNewNotifications = asyncHandler(async (req, res) => {
  const newNotifications = await Notification.find({
    userId: req.user.id,
    read: false,
  }).populate({
    path: "data",
    model: Request,
  });
  if (!newNotifications) {
    res.status(500);
    throw new Error("Error handling request");
  }
  res.status(200).json({
    success: {
      newNotifications,
    },
  });
});

// @route GET /notification/all
// @desc all user notifications
// @access Private
exports.getAllNotifications = asyncHandler(async (req, res) => {
  const allNotifications = await Notification.find({
    userId: req.user.id,
  }).populate({
    path: "data",
    model: Request,
  });
  if (!allNotifications) {
    res.status(500);
    throw new Error("Error handling request");
  }
  res.status(200).json({
    success: {
      allNotifications,
    },
  });
});

// @route PATCH /notification
// @desc read user notifications
// @access Private
exports.readNotifications = asyncHandler(async (req, res) => {
  success = await Notification.updateMany(
    { userId: req.user.id },
    { read: true }
  );
  if (!success) {
    res.status(500);
    throw new Error("Error handling request");
  }
  const newNotifications = await Notification.find({
    userId: req.user.id,
    read: false,
  }).populate({
    path: "data",
    model: Request,
  });
  res.status(200).json({
    success: {
      newNotifications,
    },
  });
});
