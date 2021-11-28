import { FetchOptions } from '../../interface/FetchOptions';

interface Props {
  paymentMethod: string;
  userId: string;
}

export async function setDefaultPayment({ paymentMethod, userId }: Props) {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentMethod }),
    credentials: 'include',
  };

  return await fetch(`/request/` + userId + `/set-default-payment`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
