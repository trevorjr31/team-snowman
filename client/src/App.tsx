import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import NavBar from './components/NavBar/NavBar';
import EditMenu from './components/EditProfile/EditMenu';
import Checkout from './components/Checkout/Checkout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import Requests from './components/Requests/Requests';
import { RequestProvider } from './context/useRequestContext';
import { SitterListingProvider } from './context/useSitterContext';
import SitterProfile from './components/SitterProfile/SitterProfile';

import EditPhoto from './components/EditProfile/EditPhoto/EditPhoto';

import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <NavBar />
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <SitterListingProvider>
                  <Route exact path="/sitter-profile" component={SitterProfile} />
                  <ProtectedRoute exact path="/dashboard">
                    <Dashboard />
                  </ProtectedRoute>
                </SitterListingProvider>
                <RequestProvider>
                  <ProtectedRoute exact path="/my-jobs">
                    <Requests />
                  </ProtectedRoute>
                </RequestProvider>
                <ProtectedRoute exact path="/messages">
                  <Dashboard />
                </ProtectedRoute>
                <ProtectedRoute exact path="/my-sitters">
                  <Dashboard />
                </ProtectedRoute>
                <Route exact path="/edit-profile" component={EditMenu} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/edit-image" component={EditPhoto} />
                <RequestProvider>
                  <ProtectedRoute exact path="/my-sitters">
                    <Dashboard />
                  </ProtectedRoute>
                </RequestProvider>
                <ProtectedRoute exact path="/edit-profile" component={EditMenu} />
                <ProtectedRoute exact path="/edit-image" component={EditPhoto} />

                <Route path="*">
                  <Redirect to="/login" />
                </Route>
              </Switch>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
