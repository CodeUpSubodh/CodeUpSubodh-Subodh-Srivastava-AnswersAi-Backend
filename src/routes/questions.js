const express = require('express');
const { createQuestion , getQuestionById , getUserQuestions } = require('../controllers/questionController');
const { validateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', validateToken, createQuestion);
router.get('/:questionId', validateToken, getQuestionById);

module.exports = router;
