// routes/auth.js

const express = require('express');
const { login, logout } = require('../controllers/authController');
const { validateLogin , validateToken } = require('../middleware/auth');


const router = express.Router();

// POST /api/auth/login
router.post('/login', validateLogin, login);
router.post('/logout', validateToken, logout);

module.exports = router;
