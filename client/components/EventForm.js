// component to trigger events
import { useState } from 'react';
import { createEvent } from '../lib/api';

export default function EventForm({ users }) {
  // state for form inputs
  const [actorId, setActorId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [eventType, setEventType] = useState('comment');

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent({
        type: eventType,
        actorId,
        targetId,
      });
      alert('Event created successfully');
    } catch (error) {
      console.error('error creating event:', error);
      alert('Failed to create event');
    }
  };

  // render form
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
      <select value={targetId} onChange={(e) => setTargetId(e.target.value)}>
        <option value="">Select Target</option>
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