const registerController = require('../controllers/registerController');

const registerRoutes = (fastify, options, done) => {
  fastify.post('/register', registerController.register);

  done();
};

module.exports = registerRoutes;
