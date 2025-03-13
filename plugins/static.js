'use strict'

const path = require('path')
const fp = require('fastify-plugin') // Helps register it properly
const fastifyStatic = require('@fastify/static')

module.exports = fp(async function (fastify, opts) {
    fastify.register(fastifyStatic, {
        root: path.join(__dirname, '../public'), // Adjust the path as needed
    })
})
