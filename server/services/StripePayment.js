const stripe = require('stripe')(process.env.SECRET_KEY);

const stripePayment = async (req, res, next) => {
  const product = await stripe.products.create({ name: 'Pet Sitter' });
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: req.body.price,
    currency: 'cad',
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN}/?canceled=true`,
  });

  req.url = session.url;
};

const createCustomer = async (req, res, next) => {
  const customer = await stripe.customers.create({
    description: 'Pet Sitter Customer (created for API docs)',
    email: req.email,
  });
  req.createdCustomer = customer;
}

const getCustomer = async (req, res, next) => {
  const customer = await stripe.customers.list({
    email: req.email,
  });
  if (customer.data.length > 0) {
    req.createdCustomer = customer.data[0];
  }
}

const subscriptionOneTimePayment = async (req, res, next) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: req.body.priceId,
        quantity: req.body.quantity,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN}/?canceled=true`,
  });

  req.url = session.url;
};

const createIntent = async (req, res, next) => {
  const intent = await stripe.setupIntents.create({
    customer: req.createdCustomer.id,
    payment_method_types: ['card'],
  });

  req.intent = intent;
};

const getPaymentMethods = async (req, res, next) => {
  const allPaymentMethods = await stripe.paymentMethods.list({
    customer: req.createdCustomer.id,
    type: 'card',
  });
  if (customer.data.length > 0) {
    req.allPaymentMethods = customer.data;
  }
}

const StripeServices = {
  stripePayment: stripePayment,
  createCustomer: createCustomer,
  getCustomer: getCustomer,
  subscriptionOneTimePayment: subscriptionOneTimePayment,
  createIntent: createIntent,
  getPaymentMethods: getPaymentMethods
};

module.exports = StripeServices;
