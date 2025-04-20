// event handlers
const Event = require('../models/Event');
const { createNotification } = require('../services/notification');

const createEvent = async (req, res) => {
  try {
    // validate request
    const { type, actorId, targetId } = req.body;
    if (!type || !actorId || !targetId) {
      return res.status(400).json({ error: 'missing required fields' });
    }

    // save event
    const event = new Event({ type, actorId, targetId });
    await event.save();

    // create notification
    await createNotification(event);

    res.status(201).json({ message: 'event created' });
  } catch (error) {
    console.error('error creating event:', error);
    res.status(500).json({ error: 'server error' });
  }
};

module.exports = { createEvent };