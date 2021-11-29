import { FetchOptions } from '../../interface/FetchOptions';
import { Profile } from '../../interface/Profile';

export async function fetchSitterProfiles(): Promise<[Profile]> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/profile/load/sitters`, fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      const profiles = data.success.sitterProfiles;
      return profiles;
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
