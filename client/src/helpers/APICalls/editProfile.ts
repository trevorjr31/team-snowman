import { ProfileData } from '../../interface/Profile';
import { FetchOptions } from '../../interface/FetchOptions';

interface Props {
  error?: string;
  success?: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  phoneNumber: string;
  address: string;
  description: string;
  isSitter: boolean;
}

const editProfile = async (props: Props): Promise<ProfileData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(props),
    credentials: 'include',
  };
  return await fetch(`/profile/edit`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default editProfile;
