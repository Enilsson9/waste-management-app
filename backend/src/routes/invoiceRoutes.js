const invoiceController = require('../controllers/invoiceController');

async function invoiceRoutes(fastify, options) {
  fastify.get('/invoice', async (request, reply) => {
    try {
      const invoices = await invoiceController.getAllinvoice();
      return invoices;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.post('/invoice', async (request, reply) => {
    try {
      const newinvoice = await invoiceController.addinvoice(request.body);
      return newinvoice;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.put('/invoice/:id', async (request, reply) => {
    try {
      const updatedinvoice = await invoiceController.updateinvoice(request.params.id, request.body);
      return updatedinvoice;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.delete('/invoice/:id', async (request, reply) => {
    try {
      await invoiceController.deleteinvoice(request.params.id);
      return { message: 'invoice deleted successfully' };
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });
}

module.exports = invoiceRoutes;
