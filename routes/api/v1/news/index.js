'use strict'

const hnLatestStream = require('hn-latest-stream')

module.exports = async (fastify, opts) => {
    fastify.get('/', (request, reply) => {
        reply.raw.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        })

        const { amount = 10 } = request.query
        const stream = hnLatestStream(amount, 'json')

        let buffer = ''
        let isFirstChunk = true

        stream.on('data', chunk => {
            buffer += chunk.toString()
            console.log(chunk.toString())

            while (buffer.includes('},')) {
                let index = buffer.indexOf('},') + 1
                let rawItem = buffer.slice(0, index + 1).trim() // Extract JSON object
                buffer = buffer.slice(index + 1).trim() // Remove processed part

                // Remove the first `[`
                if (isFirstChunk) {
                    rawItem = rawItem.replace(/^\[/, '')
                    isFirstChunk = false
                }

                // Remove trailing commas
                rawItem = rawItem.replace(/,$/, '')

                // Stream the cleaned JSON object
                reply.raw.write(`data: ${rawItem}\n\n`)
            }
        })

        stream.on('end', () => {
            // Process the last remaining JSON object in buffer
            let finalItem = buffer.trim().replace(/\]$/, '') // Remove trailing `]`
            finalItem = finalItem.replace(/,$/, '') // Remove any lingering comma

            if (finalItem) {
                reply.raw.write(`data: ${finalItem}\n\n`)
            }

            // End stream
            reply.raw.write('event: close\ndata: End of stream\n\n')
            reply.raw.end()
        })

        stream.on('error', err => {
            console.error('Stream error:', err)
            reply.raw.write('event: error\ndata: Error fetching news\n\n')
            reply.raw.end()
        })
    })
}
