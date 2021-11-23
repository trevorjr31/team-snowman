import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { checkout } from '../../helpers/APICalls/checkout';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function Checkout(): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser } = useAuth();

  const handleSubmit = (
    { priceId, quantity }: { priceId: string; quantity: number },
    { setSubmitting }: FormikHelpers<{ priceId: string; quantity: number }>,
  ) => {
    if (loggedInUser) {
      checkout({ priceId: priceId, quantity: quantity, userId: loggedInUser.id }).then((data) => {
        if (data.error) {
          setSubmitting(false);
          updateSnackBarMessage(data.error.message);
        } else if (data.url) {
          setSubmitting(false);
          window.open(data.url, '', 'width=1000,height=700');
        } else {
          setSubmitting(false);
          updateSnackBarMessage('An unexpected error occurred. Please try again');
        }
      });
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={8} md={7} elevation={4} component={Paper} square>
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          flexDirection="column"
          minHeight="100%"
        >
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography className={classes.welcome} component="h1" variant="h5">
                  Checkout
                </Typography>
              </Grid>
            </Grid>
            <CheckoutForm handleSubmit={handleSubmit} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
