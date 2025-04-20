// notification handlers
const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'userId required' });
    }

    const notifications = await Notification.find({ recipientId: userId })
      .sort({ priority: -1, createdAt: -1 })
      .limit(50);
    res.json(notifications);
  } catch (error) {
    console.error('error fetching notifications:', error);
    res.status(500).json({ error: 'server error' });
  }
};

module.exports = { getNotifications };