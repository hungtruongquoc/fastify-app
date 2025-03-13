'use strict'

const path = require('path')
const fp = require('fastify-plugin') // Helps register it properly
const fastifyStatic = require('@fastify/static')

module.exports = fp(async function (fastify, opts) {
    fastify.register(fastifyStatic, {
        root: path.join(__dirname, '../public'), // Adjust the path as needed
    })

    // Set 404 handler to serve custom 404.html
    fastify.setNotFoundHandler((request, reply) => {
        reply.status(404).sendFile('404.html')
    })
})
