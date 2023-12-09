import { Server as SocketServer } from 'socket.io'
import { Server } from 'http'

export const config = (srv: Server) => {
    const io = new SocketServer(srv, {
        cors: {
            origin: process.env.CLIENT
        }
    })

    io.on('connection', (socket) => {
        // events...
    })
}