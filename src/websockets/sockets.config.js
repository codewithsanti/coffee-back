import { Server } from 'socket.io'

export const startSockets = (server) => {
    const io = new Server(server, {
        cors: {
            credentials: true,
            origin: 'http://localhost:5173',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
        }
    })

    io.on('connection', (socket) => {
        console.log(`New sockets has been connected`)

        socket.on('disconnect', () => {
            console.log(`An user has discconected`)
        })
    })

    return io
}



