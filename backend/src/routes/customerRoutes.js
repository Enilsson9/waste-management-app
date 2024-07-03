const customerController = require('../controllers/customerController');

async function customerRoutes(fastify, options) {
  fastify.get('/customer', async (request, reply) => {
    try {
      const customers = await customerController.getAllcustomer();
      return customers;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.post('/customer', async (request, reply) => {
    try {
      const newcustomer = await customerController.addcustomer(request.body);
      return newcustomer;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.put('/customer/:id', async (request, reply) => {
    try {
      const updatedcustomer = await customerController.updatecustomer(request.params.id, request.body);
      return updatedcustomer;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.delete('/customer/:id', async (request, reply) => {
    try {
      await customerController.deletecustomer(request.params.id);
      return { message: 'customer deleted successfully' };
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });
}

module.exports = customerRoutes;
