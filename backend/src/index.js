const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const fastifyCors = require('@fastify/cors');
require('dotenv').config();

// Enable CORS
fastify.register(fastifyCors, { 
    origin: '*' 
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch(err => {
        console.error('Could not connect to MongoDB', err);
    });

// Register routes
//fastify.register(require('./routes/wasteRoutes'));

// Start server
const start = async () => {
    try {
        await fastify.listen({ port: process.env.PORT, host: '0.0.0.0' });
        fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
