const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  payment,
} = require('../controllers/payment');

router.route('/:id/pay').post(protect, payment);

module.exports = router;
