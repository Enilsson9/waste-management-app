const customerController = require('../controllers/customerController');

async function customerRoutes(fastify, options) {
  fastify.get('/customers', async (request, reply) => {
    try {
      const customers = await customerController.getAllCustomers();
      return customers;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.post('/customer', async (request, reply) => {
    try {
      const newCustomer = await customerController.addCustomer(request.body);
      return newCustomer;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.put('/customer/:id', async (request, reply) => {
    try {
      const updatedcustomer = await customerController.updateCustomer(request.params.id, request.body);
      return updatedcustomer;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.delete('/customer/:id', async (request, reply) => {
    try {
      await customerController.deleteCustomer(request.params.id);
      return { message: 'customer deleted successfully' };
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });
}

module.exports = customerRoutes;
