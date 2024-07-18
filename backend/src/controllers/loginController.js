const User = require('../models/User'); // Adjust the path as per your project structure
const bcrypt = require('bcrypt'); // Use bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Use JWT for authentication tokens

// Controller function to handle login
const login = async (request, reply) => {
  const { username, password } = request.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return reply.code(404).send({ message: 'User not found' });
    }

    // Compare provided password with stored hashed password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      console.log(password);
      console.log(user.password);
      return reply.code(401).send({ message: 'Incorrect password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });

    reply.code(200).send({ message: 'Login successful', token });
  } catch (error) {
    reply.code(500).send({ message: 'Login failed', error: error.message });
  }
};

module.exports = {
  login,
};
