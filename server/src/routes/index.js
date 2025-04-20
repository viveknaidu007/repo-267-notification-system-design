// route handler
const express = require('express');
const router = express.Router();
const { createEvent } = require('../controllers/event');
const { getNotifications } = require('../controllers/notification');
const { createUser, getUsers } = require('../controllers/user');

router.post('/events', createEvent);
router.get('/notifications', getNotifications);
router.post('/users', createUser);
router.get('/users', getUsers);

module.exports = router;