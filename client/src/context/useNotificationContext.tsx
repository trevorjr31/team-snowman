import { Notification } from '../interface/Notification';
import { fetchNotifications } from '../helpers/APICalls/getNotifications';
import { updateNotifications } from '../helpers/APICalls/updateNotifications';
import { createContext, FunctionComponent, useState, useContext, useEffect } from 'react';

interface INotificationContext {
  notifications: [Notification] | null | undefined;
  update: () => void;
}

export const NotificationContext = createContext<INotificationContext>({
  notifications: null,
  update: () => null,
});

export const NotificationProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [notifications, readNotifications] = useState<[Notification] | null | undefined>();

  useEffect(() => {
    const getNotifications = async () => {
      const fetchedNotifications = await fetchNotifications();
      readNotifications(fetchedNotifications);
    };
    getNotifications();
  }, []);

  const update = async () => {
    const updated = await updateNotifications();
    readNotifications(updated);
  };

  return <NotificationContext.Provider value={{ notifications, update }}>{children}</NotificationContext.Provider>;
};

export function useNotification(): INotificationContext {
  return useContext(NotificationContext);
}
