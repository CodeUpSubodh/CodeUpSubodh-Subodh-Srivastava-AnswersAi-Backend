// middleware/auth.js

const jwt = require('jsonwebtoken');
const redis = require('../config/redis');

const { body, validationResult } = require('express-validator');

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];


const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '14h', // Token valid for 14 hours
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const validateToken = async (req, res, next) => {
  var token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  else {
    token=token.replace('Bearer ', '');
  }

  try {
    // Check if token is blacklisted
    const isBlacklisted = await redis.get(`blacklist_${token}`);
    if (isBlacklisted) {
      return res.status(401).json({ error: 'Token Expired. Please try a new one.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: error });
  }
};

module.exports = { generateToken, verifyToken , validateLogin, validateToken};
