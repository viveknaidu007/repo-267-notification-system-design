// seed script for sample users
const mongoose = require('mongoose');
const User = require('./src/models/User');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  // Removed deprecated options
})
  .then(async () => {
    console.log('mongodb connected');
    await User.deleteMany({});
    await User.insertMany([
      { _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'), username: 'Alice', email: 'alice@example.com' },
      { _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439012'), username: 'Bob', email: 'bob@example.com' },
      { _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439013'), username: 'Charlie', email: 'charlie@example.com' },
    ]);
    console.log('users seeded');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('error:', error);
    mongoose.connection.close();
  });