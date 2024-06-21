const wasteController = require('../controllers/wasteController');

async function wasteRoutes(fastify, options) {
    fastify.get('/waste', wasteController.getAllWaste);
    fastify.post('/waste', wasteController.addWaste);
}

module.exports = wasteRoutes;