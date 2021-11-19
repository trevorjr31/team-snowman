import { FetchOptions } from '../../interface/FetchOptions';

interface Props {
  file: File;
}

export async function uploadImage({ file }: Props) {
  const data = new FormData();
  data.append('image', file);
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    body: data,
  };
  return await fetch(`/profile/upload-image`, fetchOptions)
    .then((res) => console.log(res.json()))
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
