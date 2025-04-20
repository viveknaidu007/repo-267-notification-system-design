// main page for the poc
import EventForm from '../components/EventForm';
import NotificationList from '../components/NotificationList';

export default function Home() {
  // mock users with ObjectIds for poc (in production, fetch from backend)
  const users = [
    { _id: '507f1f77bcf86cd799439011', username: 'Alice' },
    { _id: '507f1f77bcf86cd799439012', username: 'Bob' },
    { _id: '507f1f77bcf86cd799439013', username: 'Charlie' },
  ];

  // render ui
  return (
    <div className="container">
      <h1>Insyd Notification POC</h1>
      <EventForm users={users} />
      <NotificationList userId="507f1f77bcf86cd799439011" /> {/* hardcoded for alice */}
    </div>
  );
}