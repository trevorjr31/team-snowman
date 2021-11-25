import { useState, useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useAuth } from '../../context/useAuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';

export default function ProtectedRoute(routeProps: RouteProps) {
  const { loggedInUser } = useAuth();
  const [authenticated, setAuth] = useState<boolean>(false);
  const history = useHistory();
  useEffect(() => {
    if (loggedInUser !== undefined) {
      loggedInUser ? setAuth(true) : history.push('/login');
    }
  }, [loggedInUser, history]);
  if (authenticated) {
    return <Route {...routeProps} />;
  } else {
    return <CircularProgress />;
  }
}
