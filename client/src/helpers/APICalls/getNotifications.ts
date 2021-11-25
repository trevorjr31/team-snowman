import { FetchOptions } from '../../interface/FetchOptions';
import { Notification } from '../../interface/Notification';

export const fetchNotifications = async (): Promise<[Notification]> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/notification`, fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      const notificationsList = data.success.newNotifications;
      return notificationsList;
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const fetchAllNotifications = async (): Promise<[Notification]> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/notification/all`, fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      const notificationsList = data.success.AllNotifications;
      return notificationsList;
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
