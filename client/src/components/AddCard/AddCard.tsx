import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { setDefaultPayment } from '../../helpers/APICalls/setDefaultPayment';
import AddCardForm from './AddCardForm/AddCardForm';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function AddCard(): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser } = useAuth();

  const handleSubmit = (
    { paymentMethod }: { paymentMethod: string },
    { setSubmitting }: FormikHelpers<{ paymentMethod: string }>,
  ) => {
    if (loggedInUser) {
      setDefaultPayment({ paymentMethod: paymentMethod, userId: loggedInUser.id }).then((data) => {
        if (data.error) {
          setSubmitting(false);
          updateSnackBarMessage(data.error.message);
        } else if (data.url) {
          setSubmitting(false);
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
          marginTop="60px"
          marginBottom="80px"
        >
          <Box width="100%" maxWidth={1000} p={0} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography className={classes.welcome} component="h1" variant="h5">
                  Payment Methods
                </Typography>
              </Grid>
            </Grid>
            <AddCardForm handleSubmit={handleSubmit} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
