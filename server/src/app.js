// main express app
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/event');
const notificationRoutes = require('./routes/notification');

// load env variables
dotenv.config();

// initialize app
const app = express();

// connect to mongodb
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/events', eventRoutes);
app.use('/api/notifications', notificationRoutes);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});