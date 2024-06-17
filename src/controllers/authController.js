// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const { generateToken , getUserIdFromToken} = require('../middleware/auth');
const { validationResult } = require('express-validator');
const User = require('../models/User'); // Adjust path as per your structure
const redis = require('../config/redis');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });

    // If user not found or password doesn't match
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const access_token = generateToken(user.id, false);
    const refresh_token= generateToken(user.id, true);

    // Respond with token
    res.json({ access_token, refresh_token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logout = async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    // Add the token to the blacklist
    await redis.set(`blacklist_${token}`, true, 'EX', 14 * 60 * 60); // Set expiry to 14 hours

    res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const refreshToken = async (req,res) =>{
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ error: 'Access denied. No "refreshToken" provided.' });
  }
  else{
    try{
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
      const access_token = generateToken(decoded, false)
      res.json({ access_token })
    }
    catch(err)
    {
      return res.status(400).json({ errors: "Refresh Token has Expired.Please Try Logging in." });
    }
  }  
}

module.exports = { login, logout , refreshToken };
