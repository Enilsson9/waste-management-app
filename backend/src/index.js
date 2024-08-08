const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const fastifyCors = require('@fastify/cors');
const fastifyFormbody = require('@fastify/formbody');
const fastifySensible = require('@fastify/sensible');
require('dotenv').config();

// Enable CORS
fastify.register(fastifyCors, { 
    origin: '*' 
});

// Register body parser and sensible plugins
fastify.register(fastifyFormbody);
fastify.register(fastifySensible);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch(err => {
        console.error('Could not connect to MongoDB', err);
    });

// Register routes
fastify.register(require('./routes/wasteRoutes'), { prefix: '/api' });
fastify.register(require('./routes/orderRoutes'), { prefix: '/api' });
fastify.register(require('./routes/invoiceRoutes'), { prefix: '/api' });
fastify.register(require('./routes/customerRoutes'), { prefix: '/api' });
fastify.register(require('./routes/loginRoutes'), { prefix: '/api' });
fastify.register(require('./routes/registerRoutes'), { prefix: '/api' });
fastify.register(require('./routes/summaryRoutes'), { prefix: '/api' });


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
