const bcrypt = require('bcrypt');
const User = require('../models/User');

async function createUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, 10); // Hash the password with a salt rounds of 10
  userData.password = hashedPassword;
  return await User.create(userData);
}

async function getUserById(userId) {
  return await User.findByPk(userId);
}

module.exports = {
  createUser,
  getUserById,
  // Export other service methods
};
