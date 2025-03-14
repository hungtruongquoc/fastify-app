const fp = require('fastify-plugin');
const Database = require('better-sqlite3');

async function sqlitePlugin(fastify, options) {
    const db = new Database('data.db', {verbose: console.log});
    // Register the database instance in Fastify
    fastify.decorate('db', db);

    // Cleanup on shutdown
    fastify.addHook('onClose', (instance, done) => {
        db.close();
        done();
    });
}


module.exports = fp(sqlitePlugin);
