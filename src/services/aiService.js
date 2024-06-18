require('dotenv').config();
const OpenAI = require('openai');

// Initialize OpenAI API with the configuration

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY,});

const generateAIAnswer = async (question) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Change the model as per your requirement
      prompt: question,
      max_tokens: 150,
      temperature: 0.7,
    });

    const answer = response.data.choices[0].text.trim();
    return answer;
  } catch (error) {
    console.error('Error generating AI answer:', error);
    throw new Error('Failed to generate AI answer');
  }
};

module.exports = { generateAIAnswer };
