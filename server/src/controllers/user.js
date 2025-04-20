// user handlers
const User = require('../models/User');

const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username) {
      return res.status(400).json({ error: 'username is required' });
    }
    const user = new User({ username, email });
    await user.save();
    res.status(201).json({ message: 'user added successfully', userId: user._id });
  } catch (error) {
    console.error('error creating user:', error);
    res.status(500).json({ error: 'server error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username email _id'); // Select only necessary fields
    res.json(users);
  } catch (error) {
    console.error('error fetching users:', error);
    res.status(500).json({ error: 'server error' });
  }
};

module.exports = { createUser, getUsers };