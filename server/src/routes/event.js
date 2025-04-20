// event routes
const express = require('express');
const { createEvent } = require('../controllers/event');

const router = express.Router();

// create event
router.post('/', createEvent);

module.exports = router;