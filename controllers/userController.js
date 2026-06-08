const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  /* #swagger.tags = ['User'] */
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server Error: Fetching users failed.' });
  }
};

exports.getUserById = async (req, res) => {
  /* #swagger.tags = ['User'] */
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User record not found.' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID formatting supplied.' });
  }
};