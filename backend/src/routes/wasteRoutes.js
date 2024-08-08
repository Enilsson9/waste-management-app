const wasteController = require('../controllers/wasteController');

async function wasteRoutes(fastify, options) {
  fastify.get('/waste', async (request, reply) => {
    try {
      const wastes = await wasteController.getAllWaste();
      return wastes;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.post('/waste', async (request, reply) => {
    try {
      const newWaste = await wasteController.addWaste(request.body);
      return newWaste;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.put('/waste/:id', async (request, reply) => {
    try {
      const updatedWaste = await wasteController.updateWaste(request.params.id, request.body);
      return updatedWaste;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.delete('/waste/:id', async (request, reply) => {
    try {
      await wasteController.deleteWaste(request.params.id);
      return { message: 'Waste deleted successfully' };
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  // Add this new route for updating waste by name
  fastify.put('/waste/name/:name', async (request, reply) => {
    try {
      const updatedWaste = await wasteController.updateWasteByName(request.params.name, request.body);
      return updatedWaste;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });
}

module.exports = wasteRoutes;
