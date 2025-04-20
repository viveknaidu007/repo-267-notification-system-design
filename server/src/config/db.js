// mongodb connection
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // connect to local mongodb
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('mongodb connected');
  } catch (error) {
    console.error('mongodb connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;