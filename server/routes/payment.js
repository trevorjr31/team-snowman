const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  payment,
  createCustomer,
} = require('../controllers/payment');

router.route('/:id/single-pay').post(protect, payment);

router.route('/:id/create-customer').post(protect, createCustomer);


module.exports = router;
