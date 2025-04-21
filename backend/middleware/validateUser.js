const validateUser = (req, res, next) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email address. Please enter a valid email.' });
    }
  
    // Password length validation
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password length should be greater than or equal to 6' });
    }
  
    // Password strength validation (Optional)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long and include uppercase, lowercase, number, and special character.' });
    }
  
    next();
  };
  
  module.exports = validateUser;
  