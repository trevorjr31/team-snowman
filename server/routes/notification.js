const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  getNewNotifications,
  getAllNotifications,
  createNotification,
  readNotifications,
} = require("../controllers/notification");

router.route("/").post(protect, createNotification);

router.route("/").get(protect, getNewNotifications);

router.route("/all").get(protect, getAllNotifications);

router.route("/").patch(protect, readNotifications);

module.exports = router;
