import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import useStyles from './useStyles';
import logo from '../../Images/logo.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoggedInBar from './AuthBars/LoggedInBar';
import LoggedOutBar from './AuthBars/LoggedOutBar';
import CssBaseline from '@material-ui/core/CssBaseline';

interface Props {
  children?: React.ReactNode;
  pathname: string;
}

const NavBar = ({ children, pathname }: Props): JSX.Element => {
  const [isLandingPage, setIsLandingPage] = useState<boolean>(false);
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();
  useEffect(() => {
    console.log(history.location.pathname);
    if (history.location.pathname === '/') {
      setIsLandingPage(true);
    } else {
      setIsLandingPage(false);
    }
  }, [history.location.pathname]);

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;

  return (
    <Grid>
      <AppBar
        elevation={history.location.pathname === '/' ? 0 : 6}
        className={isLandingPage ? classes.landingPageBar : classes.appbar}
        position="absolute"
      >
        <CssBaseline />
        <ToolBar className={classes.toolbar}>
          <img src={logo} alt="logo" />
          {loggedInUser ? <LoggedInBar /> : <LoggedOutBar isLandingPage={isLandingPage} />}
        </ToolBar>
      </AppBar>
      {children}
    </Grid>
  );
};

export default NavBar;
