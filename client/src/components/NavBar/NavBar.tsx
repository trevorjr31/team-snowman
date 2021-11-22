import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import useStyles from './useStyles';
import logo from '../../Images/logo.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import LoggedInBar from './AuthBars/LoggedInBar';
import LoggedOutBar from './AuthBars/LoggedOutBar';
import CssBaseline from '@material-ui/core/CssBaseline';

const NavBar = (): JSX.Element => {
  const classes = useStyles();

  const { loggedInUser } = useAuth();

  return (
    <AppBar className={classes.appbar} position="absolute">
      <CssBaseline />
      <ToolBar className={classes.toolbar}>
        <img src={logo} alt="logo" />
        {loggedInUser ? <LoggedInBar /> : <LoggedOutBar />}
      </ToolBar>
    </AppBar>
  );
};

export default NavBar;
