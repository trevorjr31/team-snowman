import { FetchOptions } from '../../interface/FetchOptions';
import RequestData from '../../interface/Request';

export const fetchRequests = async (): Promise<RequestData> => {
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

export const updateRequest = async (bookingStatus: string, requestId: string): Promise<RequestData> => {
  const accepted = bookingStatus == 'accept' ? true : false;
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    body: `{"accepted":${accepted}}`,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/request/${requestId}`, fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      const updatedRequestList = data.success.requests;
      return updatedRequestList;
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
