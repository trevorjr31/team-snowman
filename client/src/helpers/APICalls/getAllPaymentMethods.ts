import { FetchOptions } from '../../interface/FetchOptions';

interface Props {
  userId: string;
}

export async function getAllPaymentMethods({ userId }: Props) {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/request/` + userId + `/all-payment-methods`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
