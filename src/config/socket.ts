import { Server as SocketServer } from 'socket.io'
import { Server } from 'http'
import { Message } from '../types/messages.type'

export const config = (srv: Server) => {
    const io = new SocketServer(srv, {
        cors: {
            origin: process.env.CLIENT
        }
    })

    io.on('connection', (socket) => {
        // events...
        socket.on('enterRoom', (roomId) => {
            // join room
            // return all room messages in Message[] type
        })

        socket.on('sendMessage', (message: Message) => {            
            const { roomId } = message
            // save message in database
            // emit a receiveMessage event to roomId room in which the message is the body 
        })

        socket.on('leaveRoom', () => {
            // leave room
        })
    })
}