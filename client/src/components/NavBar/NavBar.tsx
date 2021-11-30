import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import useStyles from './useStyles';
import logo from '../../Images/logo.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth } from '../../context/useAuthContext';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useEffect } from 'react';
import LoggedInBar from './AuthBars/LoggedInBar';
import LoggedOutBar from './AuthBars/LoggedOutBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import { useSocket } from '../../context/useSocketContext';

interface Props {
  children?: React.ReactNode;
}

const NavBar = ({ children }: Props): JSX.Element => {
  const [isLandingPage, setIsLandingPage] = useState<boolean>(false);
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const history = useHistory();

  const { initSocket } = useSocket();

  useEffect(() => {
    if (history.location.pathname === '/') {
      setIsLandingPage(true);
    } else {
      setIsLandingPage(false);
    }
  }, [history.location.pathname]);

  if (loggedInUser === undefined) return <CircularProgress />;

  return (
    <Grid>
      <AppBar
        elevation={history.location.pathname === '/' ? 0 : 6}
        className={isLandingPage ? classes.landingPageBar : classes.appbar}
        position="static"
      >
        <ToolBar className={classes.toolbar}>
          <img src={logo} alt="logo" />
          {loggedInUser ? <LoggedInBar /> : <LoggedOutBar isLandingPage={isLandingPage} />}
        </ToolBar>
      </AppBar>
      {children}
    </Grid>
    <AppBar className={classes.appbar} position="static">
      <CssBaseline />
      <ToolBar className={classes.toolbar}>
        <Link to="/dashboard">
          <img src={logo} alt="logo" />{' '}
        </Link>
        {loggedInUser ? <LoggedInBar /> : <LoggedOutBar />}
      </ToolBar>
    </AppBar>
  );
};

export default NavBar;
