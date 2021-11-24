import { Redirect, Route, RouteProps } from 'react-router';
import { useAuth } from '../../context/useAuthContext';

export default function ProtectedRoute(routeProps: RouteProps) {
  const { loggedInUser } = useAuth();
  if (loggedInUser) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: '/login' }} />;
  }
}
