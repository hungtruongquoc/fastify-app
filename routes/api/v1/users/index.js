module.exports = async (fastify, opts) => {
    fastify.get('/', async (request, reply) => {
        const users = fastify.db.prepare(`SELECT *
                                          FROM users`).all();
        return {data: users};
    })
}
