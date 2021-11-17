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

  if (!user) {
    res.status(404);
    throw new Error("User doesn't exist");
  }
  user.profile.set(req.body);
  const updatedUser = await user.save();
  res.status(200).json({
    success: {
      profile: updated_user.profile,
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

    try {
      Profile.findOneAndUpdate({ userId: id }, update, {
        new: true,
      });
      res
        .status(200)
        .send({ message: "The profile has been successfully updated" });
    } catch (err) {
      res.status(500);
      throw new Error("Server failed to update the profile");
    }

  });

});
