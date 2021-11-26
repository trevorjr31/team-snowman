import { ProfileData } from '../../interface/Profile';
import { FetchOptions } from '../../interface/FetchOptions';

interface Props {
  error?: string;
  success?: string;
  day: Date;
  start: Date;
  end: Date;
}

const editAvailability = async (props: Props): Promise<ProfileData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(props),
    credentials: 'include',
  };
  return await fetch(`/profile/edit-availability`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default editAvailability;
