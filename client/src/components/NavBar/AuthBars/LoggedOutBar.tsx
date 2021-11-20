import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

interface Props {
  isLandingPage: boolean;
}

const LoggedOutBar = ({ isLandingPage }: Props): JSX.Element => {
  const classes = useStyles();
  const becomeSitterLink = '/become-sitter';

  return (
    <Grid container className={classes.navButtons}>
      {isLandingPage && (
        <Grid item>
          <Typography component={Link} to={becomeSitterLink} variant="subtitle1" className={classes.accAside}>
            Become a sitter
          </Typography>
        </Grid>
      )}
      <Grid item>
        <Button
          component={Link}
          to="/login"
          color={isLandingPage ? 'secondary' : 'primary'}
          size="large"
          variant="outlined"
        >
          Login
        </Button>
      </Grid>
      <Grid item>
        <Button component={Link} to="/signup" color="primary" size="large" variant="contained">
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoggedOutBar;
