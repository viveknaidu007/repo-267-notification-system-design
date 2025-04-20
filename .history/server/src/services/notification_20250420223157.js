// notification logic
const Notification = require('../models/Notification');
const User = require('../models/User');

const createNotification = async (event) => {
  const actor = await User.findById(event.actorId);
  const target = await User.findById(event.targetId);
  if (!actor || !target) throw new Error('User not found for actorId or targetId');

  let message;
  let priority;
  switch (event.type) {
    case 'comment':
      message = `${actor.username} commented on your post`;
      priority = 1;
      break;
    case 'follow':
      message = `${actor.username} followed you`;
      priority = 3;
      break;
    case 'like':
      message = `${actor.username} liked your post`;
      priority = 2;
      break;
    default:
      throw new Error('Invalid event type');
  }

  const notification = new Notification({
    recipientId: event.targetId,
    type: event.type,
    message,
    status: 'unread',
    priority,
  });
  await notification.save();
  return notification;
};

module.exports = { createNotification };