const upload = require("../services/ImageUpload");
const singleUpload = upload.single("image");
const Profile = require("../models/Profile");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route POST /profile/edit
// @desc edit user profile
// @access Public
exports.editProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const updateProfile = await Profile.findByIdAndUpdate(
    user.profile,
    req.body,
    { new: true }
  );

  if (!user) {
    res.status(404);
    throw new Error("User doesn't exist");
  }
  res.status(200).json({
    success: {
      profile: updateProfile,
    },
  });
});

// @route GET /profile/load
// @desc Get user profile data
// @access Private
exports.loadProfile = asyncHandler(async (req, res, next) => {
  const profile = await User.findById(req.user.id, "profile");

  if (!profile) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    success: {
      profile: profile,
    },
  });
});

// @route POST /profile/upload-image
// @desc upload user's image
// @access Private
exports.uploadProfileImage = asyncHandler(async (req, res, next) => {
  const id = req.user.id;

  singleUpload(req, res, function (err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }

    const update = { photo: req.file.location };

    Profile.findOneAndUpdate({ userId: id }, update, {
      new: true,
    });
    res
      .status(200)
      .send({ message: "The profile has been successfully updated" });
  });
});

// @route POST /profile/edit-availability
// @desc edit a users availability
// @access Private
exports.editAvailability = asyncHandler(async (req, res, next) => {
  const profile = await User.findById(req.user.id, "profile");

  if (!profile) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const timeSlot = await Profile.findOneAndUpdate(
    { _id: profile, "availability.day": req.body.date.date },
    {
      $push: {
        availability: {
          day: req.body.date.date,
          startTime: req.body.start,
          endTime: req.body.end,
        },
      },
    },

    {
      new: true,
      upsert: true,
    }
  );

  if (!timeSlot) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    success: {
      profile: profile,
    },
  });
});
