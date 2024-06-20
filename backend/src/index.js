// src/index.js
const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const fastifyCors = require('@fastify/cors');
require('dotenv').config();

// Enable CORS
fastify.register(fastifyCors, { 
    origin: '*' 
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.error('Could not connect to MongoDB', err);
});

// Routes
fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
});

// Start server
const start = async () => {
    try {
        await fastify.listen(process.env.PORT);
        fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
