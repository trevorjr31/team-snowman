import { FetchOptions } from '../../interface/FetchOptions';

interface Props {
  priceId: string;
  quantity: number;
  userId: string;
}

export async function checkout({ priceId, quantity, userId }: Props) {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId, quantity }),
    credentials: 'include',
  };

  return await fetch(`/request/` + userId + `/create-checkout-session`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
