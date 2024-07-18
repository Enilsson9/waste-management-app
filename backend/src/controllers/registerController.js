const User = require('../models/User'); // Adjust the path as per your project structure
const bcrypt = require('bcrypt'); // Use bcrypt for password hashing

// Controller function to handle user registration
const register = async (request, reply) => {
  const { username, password, role } = request.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return reply.code(400).send({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    reply.code(201).send({ message: 'User registered successfully' });
  } catch (error) {
    reply.code(500).send({ message: 'Registration failed', error: error.message });
  }
};

module.exports = {
  register,
};
