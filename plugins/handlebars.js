'user strict'

const pointOfView = require('@fastify/view')
const handlebars = require('handlebars')
const fp = require('fastify-plugin')
const path = require('path')

module.exports = fp(async function (fastify, opts) {
    fastify.register(pointOfView, {
        engine: { handlebars },
        root: path.join(__dirname, '../views'),
        layout: 'layout.hbs'
    })
})
