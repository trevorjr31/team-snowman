const User = require("../models/User");
const stripeServices = require("../services/StripePayment");
const asyncHandler = require("express-async-handler");
const {
  stripePayment,
  createCustomer,
  getCustomer,
  subscriptionOneTimePayment,
  createIntent,
  getPaymentMethods,
} = stripeServices;

// @route POST /:id/single-pay
// @desc create single payment checkout session
// @access Private
exports.payment = asyncHandler(async (req, res) => {
  const id = req.user.id;
  if (id === req.params.id) {
    await stripePayment(req, res);

    res
      .status(200)
      .send({ message: "The payment session has been successfully created", url: req.url });
  }
});

// @route GET /:id/create-customer
// @desc create customer
// @access Private
exports.createCustomer = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id);
  req.email = user.email;

  if (id === req.params.id) {
    await createCustomer(req, res);

    res
      .status(200)
      .send({ message: "The customer has been successfully created", customer: req.createdCustomer });
  }
});

// @route GET /:id/new-customer-create-intent
// @desc create customer and intent
// @access Private
exports.newCustomerCreateIntent = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id);
  req.email = user.email;

  if (id === req.params.id) {
    await createCustomer(req, res);

    await createIntent(req, res);

    res
      .status(200)
      .send({
        message: "Both customer and intent have been successfully created",
        customer: req.createdCustomer,
        intent: req.intent
      });
  }
});

// @route GET /:id/add-card
// @desc get or create customer and create intent
// @access Private
exports.getOrCreateCustomerCreateIntent = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id);
  req.email = user.email;

  if (id === req.params.id) {
    await getCustomer(req, res);

    if (req.createdCustomer === undefined) {
      await createCustomer(req, res);
    }

    await createIntent(req, res);

    res
      .status(200)
      .send({
        message: "Both customer and intent have been successfully created",
        customer: req.createdCustomer,
        intent: req.intent
      });
  }
});

// @route GET /:id/all-payment-methods
// @desc get all payment methods
// @access Private
exports.getAllPaymentMethods = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id);
  req.email = user.email;
  if (id === req.params.id) {
    await getCustomer(req, res);

    if (req.createdCustomer != undefined) {
      await getPaymentMethods(req, res);
      res
        .status(200)
        .send({
          message: "Get all payment methods successfully",
          allPaymentMethods: req.allPaymentMethods
        });
    } else {
      res
        .status(400)
        .send({
          message: "New customer without records"
        });
    }
  }
});

// @route POST /:id/create-checkout-session
// @desc create subscription one time payment checkout session
// @access Private
exports.createCheckoutSession = asyncHandler(async (req, res) => {
  const id = req.user.id;
  if (id === req.params.id) {
    await subscriptionOneTimePayment(req, res, function (err) {
      if (err) {
        return res.json({
          success: false,
          errors: {
            title: "Stripe payment failed",
            detail: err.message,
            error: err,
          },
        });
      } else {

      }
    });
    res
      .status(200)
      .send({ message: "The payment session has been successfully created", url: req.url });
  }
});