import { Notification } from '../interface/Notification';
import { fetchNotifications } from '../helpers/APICalls/getNotifications';
import { updateNotifications } from '../helpers/APICalls/updateNotifications';
import { createContext, FunctionComponent, useState, useContext, useEffect } from 'react';

interface NotificationContext {
  notifications: [Notification] | null | undefined;
  markNotificationsAsRead: () => void;
}

export const NotificationContext = createContext<INotificationContext>({
  notifications: null,
  markNotificationsAsRead: () => null,
});

export const NotificationProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [notifications, SetNotifications] = useState<[Notification] | null | undefined>();

  useEffect(() => {
    const getNotifications = async () => {
      const fetchedNotifications = await fetchNotifications();
      SetNotifications(fetchedNotifications);
    };
    getNotifications();
  }, []);

  const markNotificationsAsRead = async () => {
    const updated = await updateNotifications();
    SetNotifications(updated);
  };

  return (
    <NotificationContext.Provider value={{ notifications, markNotificationsAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotification(): INotificationContext {
  return useContext(NotificationContext);
}
