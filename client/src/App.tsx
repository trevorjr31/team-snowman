import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import NavBar from './components/NavBar/NavBar';
import EditMenu from './components/EditProfile/EditMenu';
import Landing from './pages/Landing/Landing';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';

import EditPhoto from './components/EditProfile/EditPhoto/EditPhoto';

import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <Switch>
                <NavBar>
                  <Route exact path="/">
                    <Landing />
                  </Route>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/dashboard">
                    <Dashboard />
                  </Route>
                  <Route exact path="/my-jobs">
                    <Dashboard />
                  </Route>
                  <Route exact path="/messages">
                    <Dashboard />
                  </Route>
                  <Route exact path="/my-sitters">
                    <Dashboard />
                  </Route>
                  <Route exact path="/edit-profile" component={EditMenu} />
                  <Route exact path="/edit-image" component={EditPhoto} />
                </NavBar>
              </Switch>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
