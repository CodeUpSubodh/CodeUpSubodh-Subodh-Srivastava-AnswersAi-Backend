const User = require('../models/User');

const validateUser = async (req, res, next) => {
  const { username, email } = req.body;

  // Check if username and email are provided
  if (!username) {
    return res.status(400).json({ error: { username: 'Username is required' } });
  }

  if (!email) {
    return res.status(400).json({ error: { email: 'Email is required' } });
  }

  try {
    // Check if username already exists
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ error: { username: 'The Username is already used by someone. Please try a new one.' } });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ error: { email: 'Email Address already exists. Try Signing In.' } });
    }

    // Create a temporary instance to trigger validation
    const user = User.build(req.body);

    // Validate using Sequelize built-in validation
    await user.validate();

    // If validation passes, move to the next middleware
    next();
  } catch (err) {
    // If validation fails, format the errors
    const formattedErrors = {};
    err.errors.forEach(error => {
      formattedErrors[error.path] = error.message;
    });
    return res.status(400).json({ error: formattedErrors });
  }
};

module.exports = validateUser;
