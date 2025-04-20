// app setup
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all origins (for POC; restrict in production)
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('mongodb connected');
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  })
  .catch((error) => console.error('mongodb connection error:', error));