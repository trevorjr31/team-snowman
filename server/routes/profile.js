const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  editProfile,
  loadProfile,
  uploadProfileImage,
} = require("../controllers/profile");

router.route("/edit").post(protect, editProfile);

router.route("/load").get(protect, loadProfile);

router.route("/upload-image").post(protect, uploadProfileImage);

module.exports = router;
