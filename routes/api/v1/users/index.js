const crypto = require('crypto');

module.exports = async (fastify, opts) => {
    fastify.get('/', async (request, reply) => {
        const users = fastify.db.prepare(`SELECT *
                                          FROM users`).all();
        return {data: users};
    })

    fastify.get('/:id', async (request, reply) => {
        const {id} = request.params;
        try {
            const user = fastify.db.prepare(`SELECT *
                                          FROM users WHERE id = ?`).get(id);
            if (!user) {
                throw fastify.httpErrors.notFound()
            }

            return {data: user};
        }
        catch (error) {
            throw fastify.httpErrors.internalServerError("Failed to get user");
        }
    })

    fastify.post('/', {
        schema: {
            body: fastify.models.requestBody(fastify.models.user)
        }
    }, async (request, reply) => {
        const { data: {email, password, name} } = request.body

        const user = fastify.db.prepare(`SELECT *
                                          FROM users WHERE email = ?`).get(email);
        if (user) {
            throw fastify.httpErrors.conflict(" User already exists");
        }

        try {
            // 🔹 Hash the password using MD5
            const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
            // Insert new user
            const stmt = fastify.db.prepare(`INSERT INTO users (email, password, name) VALUES (?, ?, ?)`);
            const result = stmt.run(email, hashedPassword, name);

            console.log(`User created with ID: ${result.lastInsertRowid}`);

            return reply.code(201).send({ message: 'User created', userId: result.lastInsertRowid });
        }
        catch (error) {
            throw fastify.httpErrors.internalServerError("Failed to create user");
        }
    })
}
