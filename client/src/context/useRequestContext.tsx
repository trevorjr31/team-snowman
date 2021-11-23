import requestData from '../interface/Request';
import { fetchRequests, updateRequest } from '../helpers/APICalls/request';
import { createContext, FunctionComponent, useState, useContext, useEffect } from 'react';

interface IRequestContext {
  requests: requestData | null | undefined;
  sendResponse: (bookingStatus: string, sitterId: string) => void;
}

export const RequestContext = createContext<IRequestContext>({
  requests: null,
  sendResponse: () => null,
});

export const RequestProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [requests, updateRequests] = useState<requestData | null | undefined>();

  useEffect(() => {
    const getRequests = async () => {
      const fetchedRequests = await fetchRequests();
      updateRequests(fetchedRequests);
    };
    getRequests();
  }, []);

  const sendResponse = async (bookingStatus: string, sitterId: string) => {
    const updated = await updateRequest(bookingStatus, sitterId);
    updateRequests(updated);
  };

  return <RequestContext.Provider value={{ requests, sendResponse }}>{children}</RequestContext.Provider>;
};

export function useRequest(): IRequestContext {
  return useContext(RequestContext);
}
