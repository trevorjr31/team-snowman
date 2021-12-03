import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { confirmPayments } from '../../helpers/APICalls/confirmPayments';
import { useHistory } from 'react-router-dom';
import { useRequest } from '../../context/useRequestContext';
import Request from '../../interface/Request';

interface Props {
  totalCost: number;
  request: Request | null | undefined;
}

export default function ConfirmPaymentButton({ totalCost, request }: Props): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser, loggedInUserProfile, fetchProfileAndUpdateContext } = useAuth();
  const history = useHistory();
  const { sendResponse } = useRequest();

  const handleSubmit = async () => {
    if (loggedInUserProfile && loggedInUserProfile.defaultPaymentMethod != '' && loggedInUser) {
      confirmPayments({
        totalCost: totalCost * 100,
        paymentMethod: loggedInUserProfile.defaultPaymentMethod,
        userId: loggedInUser?.id,
      }).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.paymentIntent) {
          updateSnackBarMessage('Confirm payment successfully');
          if (request) {
            sendResponse('accept', request._id, request.owner._id, true);
          }
          history.push('/dashboard');
        } else {
          updateSnackBarMessage('An unexpected error occurred. Please try again');
        }
      });
    } else {
      updateSnackBarMessage('Please update your payment profile before checkout');
      history.push('/payment-profile');
    }
  };

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleSubmit}>
        Confirm payment
      </Button>
    </Box>
  );
}
