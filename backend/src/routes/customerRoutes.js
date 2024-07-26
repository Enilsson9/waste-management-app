const customerController = require('../controllers/customerController');

async function customerRoutes(fastify, options) {
    fastify.get('/customers', async (request, reply) => {
        try {
            const customers = await customerController.getAllCustomers();
            reply.send(customers);
        } catch (err) {
            reply.code(500).send({ error: 'Internal Server Error', message: err.message });
        }
    });

    fastify.post('/customer', async (request, reply) => {
        try {
            const newCustomer = await customerController.addCustomer(request.body);
            reply.code(201).send(newCustomer);
        } catch (err) {
            reply.code(500).send({ error: 'Internal Server Error', message: err.message });
        }
    });

    fastify.put('/customer/:id', async (request, reply) => {
        try {
            const updatedCustomer = await customerController.updateCustomer(request.params.id, request.body);
            reply.send(updatedCustomer);
        } catch (err) {
            reply.code(500).send({ error: 'Internal Server Error', message: err.message });
        }
    });

    fastify.delete('/customer/:id', async (request, reply) => {
        try {
            const result = await customerController.deleteCustomer(request.params.id);
            reply.send(result);
        } catch (err) {
            reply.code(500).send({ error: 'Internal Server Error', message: err.message });
        }
    });
}

module.exports = customerRoutes;
