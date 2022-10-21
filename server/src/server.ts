import Hapi from '@hapi/hapi'
import { start } from 'repl'

const server: Hapi.Server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
})

export async function startServer(server: Hapi.Server): Promise<Hapi.Server> {
    await server.start()
    server.log('info', `Server running on ${server.info.uri}`)
    return server
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})
