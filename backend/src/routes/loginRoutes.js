const loginController = require('../controllers/loginController');

const loginRoutes = (fastify, options, done) => {
  fastify.post('/login', loginController.login);
  done();
};

module.exports = loginRoutes;
