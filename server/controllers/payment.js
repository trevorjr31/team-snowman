const User = require("../models/User");
const StripeServices = require("../services/StripePayment");
const asyncHandler = require("express-async-handler");
const {
  stripePayment,
  createCustomer,
  getCustomer,
  subscriptionOneTimePayment,
  createIntent,
  getPaymentMethods,
} = StripeServices;

// @route POST /:id/single-pay
// @desc create single payment checkout session
// @access Private
exports.payment = asyncHandler(async (req, res, next) => {
  const id = req.user.id;
  if (id === req.params.id) {
    await stripePayment(req, res, function (err) {
      if (err) {
        return res.json({
          success: false,
          errors: {
            title: "Stripe payment failed",
            detail: err.message,
            error: err,
          },
        });
      }
    });

    res
      .status(200)
      .send({ message: "The payment session has been successfully created", url: req.url });
  }
});

// @route GET /:id/create-customer
// @desc create customer
// @access Private
exports.createCustomer = asyncHandler(async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findById(id);
  req.email = user.email;

  if (id === req.params.id) {
    await createCustomer(req, res, function (err) {
      if (err) {
        return res.json({
          success: false,
          errors: {
            title: "Create customer failed",
            detail: err.message,
            error: err,
          },
        });
      }
    });

    res
      .status(200)
      .send({ message: "The customer has been successfully created", customer: req.createdCustomer });
  }
});

// @route GET /:id/new-customer-create-intent
// @desc create customer and intent
// @access Private
exports.newCustomerCreateIntent = asyncHandler(async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findById(id);
  req.email = user.email;

  if (id === req.params.id) {
    await createCustomer(req, res, function (err) {
      if (err) {
        return res.json({
          success: false,
          errors: {
            title: "Create customer failed",
            detail: err.message,
            error: err,
          },
        });
      }
    });

    await createIntent(req, res, function (err) {
      if (err) {
        return res.json({
          success: false,
          errors: {
            title: "Create intent failed",
            detail: err.message,
            error: err,
          },
        });
      }
    });

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
exports.getOrCreateCustomerCreateIntent = asyncHandler(async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findById(id);
  req.email = user.email;

  if (id === req.params.id) {
    await getCustomer(req, res, next);

    if (req.createdCustomer === undefined) {
      await createCustomer(req, res, next);
    }

    await createIntent(req, res, next);

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
exports.getAllPaymentMethods = asyncHandler(async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findById(id);
  req.email = user.email;
  if (id === req.params.id) {
    await getCustomer(req, res, next);

    if (req.createdCustomer != undefined) {
      await getPaymentMethods(req, res, next);
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
exports.createCheckoutSession = asyncHandler(async (req, res, next) => {
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