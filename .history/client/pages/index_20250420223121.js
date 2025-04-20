// main page for the poc
import { useState } from 'react';
import EventForm from '../components/EventForm';
import NotificationList from '../components/NotificationList';

export default function Home() {
  // mock users with ObjectIds
  const users = [
    { _id: '507f1f77bcf86cd799439011', username: 'Alice' },
    { _id: '507f1f77bcf86cd799439012', username: 'Bob' },
    { _id: '507f1f77bcf86cd799439013', username: 'Charlie' },
  ];
  const [selectedUserId, setSelectedUserId] = useState('507f1f77bcf86cd799439011'); // default to Alice

  // render ui
  return (
    <div className="container">
      <h1>Insyd Notification POC v2</h1>
      <div>
        <label>Select User: </label>
        <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      <EventForm users={users} />
      <NotificationList userId={selectedUserId} />
    </div>
  );
}