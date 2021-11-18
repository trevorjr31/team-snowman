import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import login from '../../helpers/APICalls/login';
import FindSitter from './LandingForm/LandingForm';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import dogs from '../../Images/pets.jpg';

export default function Landing(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { address, password }: { address: string; password: string },
    { setSubmitting }: FormikHelpers<{ address: string; password: string }>,
  ) => {
    login(address, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid className={classes.column}>
        <Box className={classes.authWrapper}>
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography className={classes.welcome} component="h1" variant="h2">
                  Find the care your dog deserves
                </Typography>
              </Grid>
            </Grid>
            <FindSitter handleSubmit={handleSubmit} />
          </Box>
        </Box>
      </Grid>
      <Grid className={classes.column}>
        <img src={dogs} alt="dogs" className={classes.dogs} />
      </Grid>
    </Grid>
  );
}
