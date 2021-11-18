import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthApiData, AuthApiDataSuccess } from '../interface/AuthApiData';
import { User } from '../interface/User';
import loginWithCookies from '../helpers/APICalls/loginWithCookies';
import logoutAPI from '../helpers/APICalls/logout';
import { boolean } from 'yup';

interface IAuthContext {
  loggedInUser: User | null | undefined;
  updateLoginContext: (data: AuthApiDataSuccess) => void;
  logout: () => void;
  isLandingPage: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  loggedInUser: undefined,
  updateLoginContext: () => null,
  logout: () => null,
  isLandingPage: false,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
  const [isLandingPage, setIsLandingPage] = useState<boolean>(false);
  const history = useHistory();

  const updateLoginContext = useCallback(
    (data: AuthApiDataSuccess) => {
      setLoggedInUser(data.user);
      if (data.user && (history.location.pathname == '/login' || history.location.pathname == '/signup')) {
        history.push('/dashboard');
      }
    },
    [history],
  );

  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutAPI()
      .then(() => {
        history.push('/login');
        setLoggedInUser(null);
      })
      .catch((error) => console.error(error));
  }, [history]);

  useEffect(() => {
    console.log(history.location.pathname);
    if (history.location.pathname === '/') {
      setIsLandingPage(true);
    }
  }, [history.location.pathname]);

  // use our cookies to check if we can login straight away
  useEffect(() => {
    console.log(history.location.pathname);
    const checkLoginWithCookies = async () => {
      await loginWithCookies().then((data: AuthApiData) => {
        if (data.success) {
          updateLoginContext(data.success);
        } else {
          // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
          setLoggedInUser(null);
          if (!(history.location.pathname === '/signup' || history.location.pathname === '/')) {
            history.push('/login');
          }
        }
      });
    };
    checkLoginWithCookies();
  }, [updateLoginContext, history]);

  return (
    <AuthContext.Provider value={{ loggedInUser, updateLoginContext, logout, isLandingPage }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
