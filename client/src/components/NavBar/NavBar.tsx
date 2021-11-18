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
  path: string;
}

const NavBar = ({ path }: Props): JSX.Element => {
  const [isLandingPage, setIsLandingPage] = useState<boolean>(path === '/');
  const classes = useStyles();

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();

  useEffect(() => {
    console.log(path);
    setIsLandingPage(path === '/');
  }, [path]);

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;

  return (
    <AppBar
      elevation={path === '/' ? 0 : 6}
      className={isLandingPage ? classes.landingPageBar : classes.appbar}
      position="absolute"
    >
      <CssBaseline />
      <ToolBar className={classes.toolbar}>
        <img src={logo} alt="logo" />
        {loggedInUser ? <LoggedInBar /> : <LoggedOutBar isLandingPage={isLandingPage} />}
      </ToolBar>
    </AppBar>
  );
};

export default NavBar;
