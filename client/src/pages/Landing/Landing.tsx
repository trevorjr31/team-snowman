import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import FindSitter from './LandingForm/LandingForm';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import dogs from '../../Images/pets.jpeg';

export default function Landing(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { address, startDate, endDate }: { address: string; startDate: Date; endDate: Date },
    { setSubmitting }: FormikHelpers<{ address: string; startDate: Date; endDate: Date }>,
  ) => {
    //construct this function in the next ticket
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item className={classes.column}>
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
                <Typography className={classes.welcome} component="h1" variant="h2">
                  Find the care your dog deserves
                </Typography>
              </Grid>
            </Grid>
            <FindSitter handleSubmit={handleSubmit} />
          </Box>
        </Box>
      </Grid>
      <Grid item className={classes.column}>
        <img src={dogs} alt="dogs" className={classes.dogs} />
      </Grid>
    </Grid>
  );
}
