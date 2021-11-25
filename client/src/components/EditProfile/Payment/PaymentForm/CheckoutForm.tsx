import Button from '@material-ui/core/Button';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://my-site.com/order/123/complete',
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button disabled={!stripe}>Submit</Button>
    </form>
  );
};

export default CheckoutForm;
