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

  res.redirect(303, session.url);
}

module.exports = stripePayment;
