const orderController = require('../controllers/orderController');

async function orderRoutes(fastify, options) {
  fastify.get('/order', async (request, reply) => {
    try {
      const orders = await orderController.getAllorder();
      return orders;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.post('/order', async (request, reply) => {
    try {
      const neworder = await orderController.addorder(request.body);
      return neworder;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.put('/order/:id', async (request, reply) => {
    try {
      const updatedorder = await orderController.updateorder(request.params.id, request.body);
      return updatedorder;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.delete('/order/:id', async (request, reply) => {
    try {
      await orderController.deleteorder(request.params.id);
      return { message: 'order deleted successfully' };
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });
}

module.exports = orderRoutes;
