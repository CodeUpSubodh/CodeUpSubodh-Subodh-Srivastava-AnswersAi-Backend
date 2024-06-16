const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUser = require('../middleware/validateUser')
router.post('/',validateUser ,userController.createUser);
router.get('/:id', userController.getUser);
// Define other routes (PUT, DELETE, etc.)

module.exports = router;
