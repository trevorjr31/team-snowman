import { FetchOptions } from '../../interface/FetchOptions';
import { Notification } from '../../interface/Notification';

export const updateNotifications = async (): Promise<[Notification]> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/notification`, fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      const NotificationsList = data.success.newNotifications;
      return NotificationsList;
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
