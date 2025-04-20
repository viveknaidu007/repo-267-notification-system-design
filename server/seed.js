// seed script to clear database
const mongoose = require('mongoose');
const User = require('./src/models/User');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('mongodb connected');
    await User.deleteMany({});
    console.log('database cleared');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('error:', error);
    mongoose.connection.close();
  });