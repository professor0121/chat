const User = require('../models/User.model');

const registerUser = async (req, res) => {
  console.log("🔥 Received Body:", req.body); // Add this!
  try {
    const { username, mobile, password } = req.body;
    // Check if user exists
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({ username, mobile, password });

    // Generate token
    const token = user.generateAuthToken();

    res.status(201).json({
      message: 'User registered successfully 💖',
      user: {
        _id: user._id,
        username: user.username,
        mobile: user.mobile,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error 💔' });
  }
};

module.exports = { registerUser };
