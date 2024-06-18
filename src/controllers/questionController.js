const Question = require('../models/Questions');
const { generateAIAnswer } = require('../services/aiService');

const createQuestion = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.userId.userId;
  console.log(userId)

  try {
    const question = await Question.create({
      content,
      userId,
    });
    const answer = await generateAIAnswer(content);
    res.status(201).json({ question, answer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getQuestionById = async (req, res) => {
  const { questionId } = req.params;

  try {
    const question = await Question.findByPk(questionId);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    const aiAnswer = await generateAIAnswer(question.content);

    res.json({
      question: question.content,
      answer: aiAnswer
    });
  } catch (error) {
    res.status(400).json({ error: 'Unable to answer the question' });
  }
};

const getUserQuestions = async (req, res) =>{
  const { userId } = req.params;
  if (!userId){
    res.status(400).json({ error: "Invalid User ID" });
  }
  const questions = await Question.findAll({
    where: { userId },
  });
  if (!question) {
    return res.status(404).json({ error: 'Question not found' });
  }
  res.json(questions)
}

module.exports = {
  getQuestionById,
  createQuestion
};


