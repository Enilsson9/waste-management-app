const wasteController = require('../controllers/wasteController');

async function wasteRoutes(fastify, options) {
    // Get all wastes
    fastify.get('/waste', async (request, reply) => {
        try {
            const wastes = await wasteController.getAllWaste();
            return wastes;
        } catch (err) {
            reply.code(500).send({ error: 'Internal Server Error', message: err.message });
        }
    });

    // Add a new waste
    fastify.post('/waste', async (request, reply) => {
        try {
            const newWaste = await wasteController.addWaste(request.body);
            return newWaste;
        } catch (err) {
            reply.code(500).send({ error: 'Internal Server Error', message: err.message });
        }
    });

    // Example route for fetching a single waste by ID and updating or deleting

    // Update a waste by ID
    fastify.put('/waste/:id', async (request, reply) => {
        try {
            const updatedWaste = await wasteController.updateWaste(request.params.id, request.body);
            return updatedWaste;
        } catch (err) {
            reply.code(500).send({ error: 'Internal Server Error', message: err.message });
        }
    });

    // Delete a waste by ID
    fastify.delete('/waste/:id', async (request, reply) => {
        try {
            const deletedWaste = await wasteController.deleteWaste(request.params.id);
            return { message: 'Waste deleted successfully' };
        } catch (err) {
            reply.code(500).send({ error: 'Internal Server Error', message: err.message });
        }
    });
}

module.exports = wasteRoutes;
