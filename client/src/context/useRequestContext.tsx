import requestData from '../interface/Request';
import { fetchRequests, updateRequest } from '../helpers/APICalls/request';
import { useSocket } from './useSocketContext';
import { createContext, FunctionComponent, useState, useContext, useEffect } from 'react';
import { useNotification } from './useNotificationContext';
import DateObject from 'react-date-object';
import { postRequest } from '../helpers/APICalls/request';
import { Profile } from '../interface/Profile';

interface IRequestContext {
  requests: requestData | null | undefined;
  sendResponse: (bookingStatus: string, requestId: string, ownerId: string) => void;
  requestADate: (requestedDate: DateObject | null | undefined, time: string, type: string) => void;
  requestedStart: Date | null | undefined;
  requestedEnd: Date | null | undefined;
  sendARequest: (sitter: Profile | null | undefined) => Promise<boolean | null | undefined> | null | undefined;
}

export const RequestContext = createContext<IRequestContext>({
  requests: null,
  sendResponse: () => null,
  requestedStart: null,
  requestedEnd: null,
  sendARequest: (sitter: Profile | null | undefined) => null,
  requestADate: (requestedDate: DateObject | null | undefined, time: string, type: string) => {
    requestedDate;
    time;
  },
});

export const RequestProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [requests, setRequests] = useState<requestData | null | undefined>();
  const [requestedStart, setRequestedStart] = useState<Date | null | undefined>();
  const [requestedEnd, setRequestedEnd] = useState<Date | null | undefined>();
  const { emitNotification } = useSocket();
  const { sendNewNotification } = useNotification();
  useEffect(() => {
    const getRequests = async () => {
      const fetchedRequests = await fetchRequests();
      setRequests(fetchedRequests);
    };
    getRequests();
  }, []);

  const requestADate = (requestedDate: DateObject | null | undefined, time: string, type: string) => {
    const convertedDate = requestedDate?.toDate();
    if (convertedDate) {
      convertedDate.setHours(
        time.slice(-2) == 'AM' || parseInt(time.slice(0, -3)) === 12
          ? parseInt(time.slice(0, -3))
          : parseInt(time.slice(0, -3)) + 12,
      );
      convertedDate.setMinutes(0);
      type === 'start' ? setRequestedStart(convertedDate) : setRequestedEnd(convertedDate);
    }
  };

  const sendResponse = async (bookingStatus: string, requestId: string, ownerId: string) => {
    const updated = await updateRequest(bookingStatus, requestId);
    sendNewNotification(requestId, 'requestUpdate');
    setRequests(updated);
    emitNotification(ownerId);
  };

  const sendARequest = async (sitter: Profile | null | undefined) => {
    const success = await postRequest(sitter?.userId, requestedStart, requestedEnd);
    if (success) {
      const newRequest = success._id;
      if (sitter) {
        sendNewNotification(newRequest, 'newRequest');
        emitNotification(sitter.userId);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <RequestContext.Provider
      value={{ requests, sendResponse, requestADate, requestedStart, requestedEnd, sendARequest }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export function useRequest(): IRequestContext {
  return useContext(RequestContext);
}
