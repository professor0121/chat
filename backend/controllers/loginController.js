const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs')

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Find user and explicitly select password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password user not ' });

    }

    // 🔐 Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
console.log(isMatch)
    // 🎫 Generate JWT
    const token = user.generateAuthToken();

    // 🍪 Set token in HTTP-only cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
      sameSite: 'Strict',
    });

    // ✅ Send success response without password
    res.status(200).json({
      message: 'Login successful 💫',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        password:password
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { loginUser };
