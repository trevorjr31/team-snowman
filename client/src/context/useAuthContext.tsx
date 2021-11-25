import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthApiData, AuthApiDataSuccess } from '../interface/AuthApiData';
import { User } from '../interface/User';
import { Profile, ProfileData } from '../interface/Profile';
import loginWithCookies from '../helpers/APICalls/loginWithCookies';
import logoutAPI from '../helpers/APICalls/logout';
import loadProfile from '../helpers/APICalls/loadProfile';

interface IAuthContext {
  loggedInUser: User | null | undefined;
  loggedInUserProfile: Profile | null | undefined;
  updateLoginContext: (data: AuthApiDataSuccess) => void;
  updateProfileContext: (profile: Profile) => void;
  fetchProfileAndUpdateContext: () => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  loggedInUser: undefined,
  loggedInUserProfile: undefined,
  updateLoginContext: () => null,
  updateProfileContext: () => null,
  fetchProfileAndUpdateContext: () => null,
  logout: () => null,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
  const [loggedInUserProfile, setLoggedInUserProfile] = useState<Profile | null | undefined>();
  const history = useHistory();

  const updateProfileContext = useCallback((profile: Profile) => {
    setLoggedInUserProfile(profile);
  }, []);

  const fetchProfileAndUpdateContext = useCallback(async () => {
    await loadProfile().then((data: ProfileData) => {
      if (data.success) {
        updateProfileContext(data.profile);
      }
    });
  }, [updateProfileContext]);

  const updateLoginContext = useCallback(
    async (data: AuthApiDataSuccess) => {
      setLoggedInUser(data.user);
      await fetchProfileAndUpdateContext();
      if (data.user && (history.location.pathname == '/login' || history.location.pathname == '/signup')) {
        history.push('/dashboard');
      }
    },
    [fetchProfileAndUpdateContext, history],
  );

  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutAPI()
      .then(() => {
        history.push('/login');
        setLoggedInUser(null);
        setLoggedInUserProfile(null);
      })
      .catch((error) => console.error(error));
  }, [history]);

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const checkLoginWithCookies = async () => {
      await loginWithCookies().then(async (data: AuthApiData) => {
        if (data.success) {
          updateLoginContext(data.success);
          await fetchProfileAndUpdateContext();
        } else {
          // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
          setLoggedInUser(null);
          setLoggedInUserProfile(null);
          if (!(history.location.pathname == '/signup')) {
            history.push('/login');
          }
        }
      });
    };
    checkLoginWithCookies();
  }, [updateLoginContext, fetchProfileAndUpdateContext, history]);

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        loggedInUserProfile,
        updateLoginContext,
        updateProfileContext,
        fetchProfileAndUpdateContext,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
