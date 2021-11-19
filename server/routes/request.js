const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  makeRequest,
  getRequest,
  editRequest,
} = require("../controllers/request");

router.route("/").post(protect, makeRequest);

router.route("/").get(protect, getRequest);

router.route("/:id").patch(protect, editRequest);

module.exports = router;
