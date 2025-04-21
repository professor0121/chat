const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');
const {loginUser}=require('../controllers/loginController')
const loginMiddleware=require('../middleware/login.middleware')
const validateUser=require("../middleware/validateUser")

router.post('/register',validateUser, registerUser);
router.post('/login',loginMiddleware,loginUser);
router.post('/logout', (req, res) => {
    res.clearCookie('authToken'); // Clear the cookie
    res.status(200).json({ message: 'Logged out successfully' });
  });

module.exports = router;
