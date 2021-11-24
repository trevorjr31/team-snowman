import { ProfileData } from '../../interface/Profile';
import { FetchOptions } from '../../interface/FetchOptions';

const loadProfile = async (): Promise<ProfileData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile/load`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default loadProfile;
