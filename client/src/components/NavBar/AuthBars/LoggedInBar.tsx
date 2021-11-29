import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import AuthMenu from '../../AuthMenu/AuthMenu';
import NotificationLink from '../../NotificationDisplay/NotificationDisplay';
import { useTour } from '@reactour/tour';
import { useEffect } from 'react';

const LoggedInBar = (): JSX.Element => {
  const classes = useStyles();
  const { isOpen, setIsOpen, currentStep, setCurrentStep } = useTour();

  useEffect(() => {
    setCurrentStep(7);
  }, [setCurrentStep, isOpen]);

  useEffect(() => {
    if (currentStep < 7 || currentStep > 11) {
      setIsOpen(false);
    }
  }, [currentStep, setIsOpen]);

  return (
    <Grid container className={classes.navButtons}>
      <Button variant="outlined" color="primary" onClick={() => setIsOpen(true)}>
        Try our tour
      </Button>
      <Grid data-tour="narbar-notifications" item>
        <NotificationLink />
      </Grid>
      <Grid item>
        <Button component={Link} to="/my-jobs" color="secondary" size="large" variant="text">
          <Typography data-tour="narbar-my-jobs" variant="h3">
            My Jobs
          </Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button component={Link} to="/messages" color="secondary" size="large" variant="text">
          <Typography data-tour="narbar-messages" variant="h3">
            Messages
          </Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button component={Link} to="/my-sitters" color="secondary" size="large" variant="text">
          <Typography data-tour="narbar-my-sitters" variant="h3">
            My Sitters
          </Typography>
        </Button>
      </Grid>
      <Grid data-tour="narbar-avatar" item>
        <AuthMenu />
      </Grid>
    </Grid>
  );
};

export default LoggedInBar;
