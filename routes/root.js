'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    // return reply.redirect('/construction')
    return reply.view('index.hbs')
  })
}
