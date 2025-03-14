const fp = require('fastify-plugin');

module.exports = fp(async (fastify) => {
    fastify.decorate('models', {
        user: require('../models/user'),
        requestBody: require('../models/request_body')
    });
});
