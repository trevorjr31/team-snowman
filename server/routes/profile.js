const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  editProfile,
  loadProfile,
  uploadProfileImage,
  loadSitterProfiles,
} = require("../controllers/profile");

router.route("/edit").post(protect, editProfile);

router.route("/load").get(protect, loadProfile);

router.route("/load/sitters").get(protect, loadSitterProfiles);

router.route("/upload-image").post(protect, uploadProfileImage);

module.exports = router;
