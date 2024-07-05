const invoiceController = require('../controllers/invoiceController');

async function invoiceRoutes(fastify, options) {
  fastify.get('/invoices', async (request, reply) => {
    try {
      const invoices = await invoiceController.getAllInvoices();
      return invoices;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.post('/invoice', async (request, reply) => {
    try {
      const newinvoice = await invoiceController.addInvoice(request.body);
      return newinvoice;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.put('/invoice/:id', async (request, reply) => {
    try {
      const updatedinvoice = await invoiceController.updateInvoice(request.params.id, request.body);
      return updatedinvoice;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.delete('/invoice/:id', async (request, reply) => {
    try {
      await invoiceController.deleteInvoice(request.params.id);
      return { message: 'invoice deleted successfully' };
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });
}

module.exports = invoiceRoutes;
