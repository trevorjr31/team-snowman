import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AddCardInfoForm from './AddCardInfoForm/AddCardInfoForm';

/*interface Props {
  clientSecret: string;
}*/

const AddCardInfo = (props: any): JSX.Element => {
  const options = {
    // passing the client secret obtained in step 2
    clientSecret: props.location.state.clientSecret,
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  if (process.env.REACT_APP_SECRET_KEY === undefined) {
    return <p>No secret key</p>;
  } else {
    const stripePromise = loadStripe(process.env.REACT_APP_SECRET_KEY);
    return (
      <Elements stripe={stripePromise} options={options}>
        <AddCardInfoForm />
      </Elements>
    );
  }
};

export default AddCardInfo;
