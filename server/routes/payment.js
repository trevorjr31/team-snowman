const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  payment,
  createCustomer,
  newCustomerCreateIntent,
  getOrCreateCustomerCreateIntent,
  createCheckoutSession,
  getAllPaymentMethods,
  checkoutWithCreatedIntent,
} = require('../controllers/payment');

router.route('/:id/single-pay').post(protect, payment);

router.route('/:id/create-customer').get(protect, createCustomer);

router.route('/:id/new-customer-create-intent').get(protect, newCustomerCreateIntent);

router.route('/:id/add-card').get(protect, getOrCreateCustomerCreateIntent);

router.route('/:id/checkout-with-created-intent').get(protect, checkoutWithCreatedIntent);

router.route('/:id/all-payment-methods').get(protect, getAllPaymentMethods);

router.route('/:id/create-checkout-session').post(protect, createCheckoutSession);

module.exports = router;
