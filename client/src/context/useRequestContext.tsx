import requestData from '../interface/Request';
import fetchRequests from '../helpers/APICalls/request';
import { createContext, FunctionComponent, useState, useContext, useEffect } from 'react';

interface IRequestContext {
  requests: requestData | null | undefined;
}

export const RequestContext = createContext<IRequestContext>({
  requests: null,
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

  return <RequestContext.Provider value={{ requests }}>{children}</RequestContext.Provider>;
};

export function useRequest(): IRequestContext {
  return useContext(RequestContext);
}
