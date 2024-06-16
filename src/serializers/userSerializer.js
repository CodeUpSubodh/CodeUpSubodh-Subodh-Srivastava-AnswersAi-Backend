function serialize(user) {
  return {
    id: user.id, // UUID field
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    // Exclude password from the serialized output
  };
}

module.exports = {
  serialize,
};
