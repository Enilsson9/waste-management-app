const orderController = require('../controllers/orderController');

async function orderRoutes(fastify, options) {
  fastify.get('/orders', async (request, reply) => {
    try {
      const orders = await orderController.getAllOrders();
      return orders;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.post('/order', async (request, reply) => {
    try {
      const neworder = await orderController.addOrder(request.body);
      return neworder;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.put('/order/:id', async (request, reply) => {
    try {
      const updatedorder = await orderController.updateOrder(request.params.id, request.body);
      return updatedorder;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.delete('/order/:id', async (request, reply) => {
    try {
      await orderController.deleteOrder(request.params.id);
      return { message: 'order deleted successfully' };
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });
}

module.exports = orderRoutes;
