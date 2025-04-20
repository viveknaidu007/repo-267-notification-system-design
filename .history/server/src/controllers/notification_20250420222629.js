// notification handlers
const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
  try {
    // validate userId
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'userId required' });
    }

    // fetch notifications using string comparison
    const notifications = await Notification.find({ recipientId: userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(notifications);
  } catch (error) {
    console.error('error fetching notifications:', error);
    res.status(500).json({ error: 'server error' });
  }
};

module.exports = { getNotifications };