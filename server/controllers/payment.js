const upload = require("../services/ImageUpload");
const StripeServices = require("../services/StripePayment");
const asyncHandler = require("express-async-handler");
const { stripePayment, createCustomer } = StripeServices;
// @route POST /:id/single-pay
// @desc create checkout session
// @access Private
exports.payment = asyncHandler(async (req, res, next) => {
  const id = req.user.id;
  if (id === req.params.id) {
    stripePayment(req, res, function (err) {
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

      res
        .status(200)
        .send({ message: "The payment has been successfully processed" });
    });
  }
});

// @route POST /:id/create-customer
// @desc create checkout session
// @access Private
exports.createCustomer = asyncHandler(async (req, res, next) => {
  const id = req.user.id;
  if (id === req.params.id) {
    createCustomer(req, res, function (err) {
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

      res
        .status(200)
        .send({ message: "The customer has been successfully created", customer: req.createdCustomer });
    });
  }
});