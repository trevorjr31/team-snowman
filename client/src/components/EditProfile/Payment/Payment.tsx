import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './PaymentForm/CheckoutForm';

const PUBLISHABLE_KEY =
  process.env.REACT_APP_PUBLISHABLE_KEY === undefined ? '' : process.env.REACT_APP_PUBLISHABLE_KEY.toString();
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY === undefined ? '' : process.env.REACT_APP_SECRET_KEY.toString();
const id_secret = PUBLISHABLE_KEY + '_secret_' + SECRET_KEY;
const stripePromise = loadStripe(PUBLISHABLE_KEY);
console.log('SECRET_KEY: ' + process.env.REACT_APP_SECRET_KEY);

const Payment = () => {
  const options = {
    clientSecret: id_secret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
