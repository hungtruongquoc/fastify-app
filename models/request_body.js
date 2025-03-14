module.exports = function(data) {
    return {
        type: 'object',
        required: ['data'],
        additionalProperties: false,
        properties: {
            data
        }
    }
}
