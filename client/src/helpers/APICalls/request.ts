import { FetchOptions } from '../../interface/FetchOptions';
import RequestData from '../../interface/Request';

const fetchRequests = async (): Promise<RequestData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/request`, fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      const requestList = data.success.requests;
      return requestList;
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default fetchRequests;
