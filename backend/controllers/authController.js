const User = require('../models/User.model');

const registerUser = async (req, res) => {
  console.log("🔥 Received Body:", req.body);
  try {
    const { username, email, password } = req.body;

    // Normalize email (convert to lowercase)
    const normalizedEmail = email.toLowerCase();

    // 🔍 Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      console.log("⚠️ User already exists with email:", email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // ✨ Create new user (hash password before saving)
    const user = await User.create({ username, email: normalizedEmail, password });

    // 🔐 Generate auth token
    const token = user.generateAuthToken();

     // Set the JWT token in a cookie
     res.cookie('authToken', token, {
      httpOnly: true, // Ensures that the cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === 'production', // Only set cookie over HTTPS in production
      maxAge: 3600000, // Token expires in 1 hour
      sameSite: 'Strict', // Helps protect against CSRF attacks
    });

    // 🎉 Send success response
    res.status(201).json({
      message: 'User registered successfully 💖',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ message: 'Server Error 💔' });
  }
};

module.exports = { registerUser };
