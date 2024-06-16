// controllers/authController.js

const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/auth');
const { validationResult } = require('express-validator');
const User = require('../models/User'); // Adjust path as per your structure

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
    const token = generateToken(user.id);

    // Respond with token
    res.json({ token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { login };