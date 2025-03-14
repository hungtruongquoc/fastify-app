module.exports = async (fastify, opts) => {
    fastify.get('/', async (request, reply) => {
        const users = fastify.db.prepare(`SELECT *
                                          FROM users`).all();
        return {data: users};
    })

    fastify.get('/:id', async (request, reply) => {
        const {id} = request.params;
        const user = fastify.db.prepare(`SELECT *
                                          FROM users WHERE id = ?`).get(id);
        if (!user) {
            throw fastify.httpErrors.notFound()
        }

        return {data: user};
    })
}
