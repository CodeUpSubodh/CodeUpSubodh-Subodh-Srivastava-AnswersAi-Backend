const userService = require('../services/userService');
const userSerializer = require('../serializers/userSerializer');
const { body, validationResult } = require('express-validator');

// Controller function to create a user
async function createUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }

  try {
    const { firstName, lastName, username, email, password } = req.body;
    const newUser = await userService.createUser({ firstName, lastName, username, email, password });
    res.json(userSerializer.serialize(newUser));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

// Controller function to get a user
async function getUser(req, res) {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(userSerializer.serialize(user));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createUser,
  getUser
};
