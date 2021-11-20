import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import useStyles from './useStyles';
import login from '../../helpers/APICalls/login';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { demoUser } from '../../mocks/demoUser/demoUser';

export default function DemoLoginBtn(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleDemoLogin = () => {
    const email = demoUser.email;
    const password = demoUser.password;
    login(email, password).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Box>
      <Button size="large" className={classes.btn} color="primary" variant="outlined" onClick={handleDemoLogin}>
        Demo User Login
      </Button>
    </Box>
  );
}
