import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './PaymentForm/CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const PUBLISHABLE_KEY =
  process.env.REACT_APP_PUBLISHABLE_KEY === undefined ? '' : process.env.REACT_APP_PUBLISHABLE_KEY.toString();
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY === undefined ? '' : process.env.REACT_APP_SECRET_KEY.toString();
const id_secret = PUBLISHABLE_KEY + '_secret_' + SECRET_KEY;
const stripePromise = loadStripe(PUBLISHABLE_KEY);
console.log('SECRET_KEY: ' + process.env.REACT_APP_SECRET_KEY);

const Payment = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: id_secret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
