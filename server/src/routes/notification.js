// notification routes
const express = require('express');
const { getNotifications } = require('../controllers/notification');

const router = express.Router();

// get notifications
router.get('/', getNotifications);

module.exports = router;