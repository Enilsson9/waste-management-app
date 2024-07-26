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
      const newInvoice = await invoiceController.addInvoice(request.body);
      return newInvoice;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.put('/invoice/:id', async (request, reply) => {
    try {
      const updatedInvoice = await invoiceController.updateInvoice(request.params.id, request.body);
      return updatedInvoice;
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });

  fastify.delete('/invoice/:id', async (request, reply) => {
    try {
      await invoiceController.deleteInvoice(request.params.id);
      return { message: 'Invoice deleted successfully' };
    } catch (err) {
      reply.code(500).send({ error: 'Internal Server Error', message: err.message });
    }
  });
}

module.exports = invoiceRoutes;
