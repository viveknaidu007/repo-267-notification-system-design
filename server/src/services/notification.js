// notification logic
const Notification = require('../models/Notification');
const User = require('../models/User');

const createNotification = async (event) => {
  // find actor and target users
  const actor = await User.findById(event.actorId);
  const target = await User.findById(event.targetId);
  if (!actor || !target) throw new Error('user not found');

  // create notification message
  let message;
  switch (event.type) {
    case 'comment':
      message = `${actor.username} commented on your post`;
      break;
    case 'follow':
      message = `${actor.username} followed you`;
      break;
    case 'like':
      message = `${actor.username} liked your post`;
      break;
    default:
      throw new Error('invalid event type');
  }

  // save notification
  const notification = new Notification({
    recipientId: event.targetId,
    type: event.type,
    message,
    status: 'unread',
  });
  await notification.save();
  return notification;
};

module.exports = { createNotification };