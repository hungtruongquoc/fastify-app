module.exports = {
    type: 'object',
    required: ['password', 'email'],
    properties: {
        password: { type: 'string', minLength: 6 },
        email: { type: 'string', format: 'email'  },
        name: { type: 'string' },
    }
}
