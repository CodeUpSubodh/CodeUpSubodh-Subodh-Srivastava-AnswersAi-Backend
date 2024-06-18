const express = require('express');
const router = express.Router();
const {createUser , getUserQuestions , getUser} = require('../controllers/userController');
const validateUser = require('../middleware/validateUser')
const { validateToken } = require('../middleware/auth')

router.post('/',validateUser ,createUser);
router.get('/:id',validateToken,getUser);
router.get('/:userId/questions',validateToken,getUserQuestions)
// Define other routes (PUT, DELETE, etc.)

module.exports = router;
