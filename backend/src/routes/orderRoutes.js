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
      const newOrder = await orderController.addOrder(request.body);
      return newOrder;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.put('/order/:id', async (request, reply) => {
    try {
      const updatedOrder = await orderController.updateOrder(request.params.id, request.body);
      return updatedOrder;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.delete('/order/:id', async (request, reply) => {
    try {
      await orderController.deleteOrder(request.params.id);
      return { message: 'Order deleted successfully' };
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });
}

module.exports = orderRoutes;
