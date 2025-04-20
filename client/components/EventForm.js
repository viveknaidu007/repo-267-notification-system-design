// component to trigger events
import { useState } from 'react';
import { createEvent } from '../lib/api';

export default function EventForm({ users, selectedUserId }) {
  const [actorId, setActorId] = useState('');
  const [eventType, setEventType] = useState('comment');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUserId || !actorId) return;
    try {
      await createEvent({
        type: eventType,
        actorId,
        targetId: selectedUserId,
      });
      alert('Event created successfully');
    } catch (error) {
      console.error('error creating event:', error);
      alert('Failed to create event');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Event</h2>
      <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
        <option value="comment">Comment</option>
        <option value="follow">Follow</option>
        <option value="like">Like</option>
      </select>
      <select value={actorId} onChange={(e) => setActorId(e.target.value)}>
        <option value="">Select Actor</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>
      <button type="submit">Trigger Event</button>
    </form>
  );
}