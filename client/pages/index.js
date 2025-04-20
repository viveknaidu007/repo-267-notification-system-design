// main page for the poc
import { useState, useEffect } from 'react';
import EventForm from '../components/EventForm';
import NotificationList from '../components/NotificationList';
import { getUsers, createUser } from '../lib/api';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(); // Placeholder; update with real API
        setUsers(data);
        if (data.length > 0) setSelectedUserId(data[0]._id);
      } catch (error) {
        console.error('error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser({ username: newUsername, email: newEmail });
      setUsers([...users, { _id: response.userId, username: newUsername, email: newEmail }]);
      setShowAddUser(false);
      setNewUsername('');
      setNewEmail('');
      setSelectedUserId(response.userId); // Select the new user
      alert('User added successfully');
    } catch (error) {
      console.error('error adding user:', error);
      alert('Failed to add user');
    }
  };

  return (
    <div className="container">
      <h1>Insyd Notification POC v3</h1>
      <div>
        <label>Select User: </label>
        <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
          <option value="" disabled>Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
          <option value="add-new" onClick={() => setShowAddUser(true)}>+ Add New User</option>
        </select>
      </div>
      {showAddUser && (
        <form onSubmit={handleAddUser}>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Email (optional)"
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setShowAddUser(false)}>Cancel</button>
        </form>
      )}
      {selectedUserId && selectedUserId !== 'add-new' && <EventForm users={users} selectedUserId={selectedUserId} />}
      {selectedUserId && selectedUserId !== 'add-new' && <NotificationList userId={selectedUserId} />}
    </div>
  );
}