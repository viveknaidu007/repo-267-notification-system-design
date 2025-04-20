// component to display notifications
import { useEffect, useState } from 'react';
import { getNotifications } from '../lib/api';

export default function NotificationList({ userId }) {
  // state for notifications
  const [notifications, setNotifications] = useState([]);

  // fetch notifications on mount and every 5 seconds
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications(userId);
        setNotifications(data);
      } catch (error) {
        console.error('error fetching notifications:', error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  // render notification list
  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((notification) => (
          <div key={notification._id} className="notification">
            <p>{notification.message}</p>
            <small>{new Date(notification.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}