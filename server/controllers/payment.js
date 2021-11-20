const upload = require("../services/ImageUpload");
const stripePayment = require("../services/StripePayment");
const asyncHandler = require("express-async-handler");

// @route POST /create-checkout-session
// @desc create checkout session
// @access Private
exports.payment = asyncHandler(async (req, res, next) => {
  const id = req.user.id;

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
});
